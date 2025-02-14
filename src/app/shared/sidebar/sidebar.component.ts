import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Sidebar } from '../../model/sidebar.model';
import { NavigationEnd, Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  rolePath: string = '';
  userDetails: any
  userPermissions: any
  permissionMap: any
  activeMenu: string = '';
  sidebar = "normal"
  showPortalLayout: boolean = false;
  @Output() sidebarClose: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  constructor(private _router: Router, private _sessionService: SessionService) {
    this.rolePath = this._sessionService?.getRolePath;
    this.userDetails = this._sessionService?.getUserDetails();
    this.userPermissions = this._sessionService?.getPermissions();
    this.sideMenu = this.updateSidebarMenu(this.sideMenu, this.userPermissions)
    this._router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.updateLayoutVisibility();
    });
  }

  sideMenu: Sidebar[] = [
    {
      name: 'Dashboard',
      path: 'dashboard',
      icon: 'house-icon.svg',
      isAllowed: true,
      code: 'Dashboard',
      child: []
    },
    {
      name: 'Manage Task',
      path: 'task/tasks-list',
      icon: 'television.svg',
      isAllowed: true,
      code: 'Manage Task',
      child: []
    },
  ];



  ngOnInit(): void {
    // console.log("user-", this.userDetails)
    // console.log("permission-", this.userPermissions)
    // console.log(this.sideMenu)
    this.updateLayoutVisibility();
  }

  moveTo(path: any) {
    this._router.navigate([`/${this.rolePath}/${path}`]);
  }
  moveToWithId(data: any = { id: '', url: '' }) {
    this._router.navigate([`/${this.rolePath}/${data?.url}`, data?.id]);
  }

  moveToWithTwoId(data: any = { deptId: '', teamId: '', url: '' }) {
    this._router.navigate([`/${this.rolePath}/${data?.url}`, data?.deptId, data?.teamId])
  }

  trimSpace(item: any) {
    return item.replace(/ /g, '');
  }

  updateSidebarMenu(sideMenu: Sidebar[], userPermissions: any): Sidebar[] {
    if (this.userDetails?.userType !== 'user') {
      // Create a map for quick permission lookups
      this.permissionMap = new Map<string, boolean>(
        userPermissions.map((p: any) => [p.moduleName, p.permissions.view])
      );
      return this.updateMenu(sideMenu);
    }
    return sideMenu;
  }

  updateMenu(menu: Sidebar[]): Sidebar[] {
    return menu.map(item => {
      if (item.child.length > 0) {
        item.child = this.updateMenu(item.child);
        item.isAllowed = item.child.some(child => child.isAllowed);
      } else {
        item.isAllowed = this.permissionMap.get(item.code) ?? false;
      }
      return item;
    });
  }


  setActiveMenu(menu: any) {
    this.activeMenu = menu;
  }

  updateLayoutVisibility(): void {
    console.log(this._router.url);
    if (this._router.url.includes('signin')) {
      this.showPortalLayout = false;
    }
    else if (this._router.url.includes('settings')) {
      this.sidebar = 'admin-settings'
      this.sidebarClose.emit(false)
    }
    else if (this._router.url.includes('add-article') || this._router.url.includes('edit-article')) {
      this.sidebar = ''
      this.sidebarClose.emit(true)
    }
    else {
      this.showPortalLayout = true;
      this.sidebar = 'normal'
      this.sidebarClose.emit(false)
    }
  }
}
