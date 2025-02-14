import { Component, OnInit } from '@angular/core';
import { Sidebar } from '../../model/sidebar.model';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-sidebar-admin-settings',
  templateUrl: './sidebar-admin-settings.component.html',
  styleUrl: './sidebar-admin-settings.component.scss'
})

export class SidebarAdminSettingsComponent implements OnInit {
  rolePath: string = ''
  activeMenu: string = ''


  constructor(private _router: Router, private _loginService: LoginService) {
    this._loginService.rolePath$.subscribe(path => {
      this.rolePath = path;
    });

  }

  sideMenu: any[] = [
    {
      name: 'Profile',
      path: 'settings/profile',
      icon: 'user.svg',
      child: []
    },
  ]

  ngOnInit(): void {
  }

  moveTo(path: any) {
    console.log(`/${this.rolePath}/${path?.path}`)
    this._router.navigate([`/${this.rolePath}/${path}`]);
  }
  moveToWithId(data: any = { id: '', url: '' }) {
    this._router.navigate([`/${this.rolePath}/${data?.url}`, data?.id]);
  }

  moveToWithTwoId(data: any = { deptId: '', teamId: '', url: '' }) {
    this._router.navigate([`/${this.rolePath}/${data?.url}`, data?.deptId, data?.teamId])
  }


  trimSpace(item: any) {
    return item.replace(/ /g, '')

  }

  setActiveMenu(path: string) {
    this.activeMenu = path;
  }
}

