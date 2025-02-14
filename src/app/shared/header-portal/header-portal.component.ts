import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { LoginService } from '../../services/login.service';
import { SnackbarService } from '../../services/snackbar.service';
import { Location } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header-portal',
  templateUrl: './header-portal.component.html',
  styleUrl: './header-portal.component.scss'
})
export class HeaderPortalComponent implements OnInit {
  userImg = 'assets/images/profileDummy.png'
  rolePath: string = '';
  user: any
  homeUrl: any = '';
  sidebar: string = 'normal';  //admin-settings change view for this
  showPortalLayout: boolean = false;
  constructor(private _router: Router, private _sessionService: SessionService,
    private _loginService: LoginService, private snackbarService: SnackbarService,
    private location: Location
  ) {
    this._loginService.rolePath$.subscribe(path => {
      this.rolePath = path;
    });
    this._router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.updateLayoutVisibility();
    });
  }

  ngOnInit(): void {
    this.user = this._sessionService?.getUserDetails();
    this.updateLayoutVisibility();

  }

  onSignout() {
    this._loginService.logoutAdminUser().subscribe({
      next: (res) => {
        sessionStorage.removeItem('token');
      },
      error: (err) => {
        sessionStorage.removeItem('token');
        // if (err.error) {
        //   this.snackbarService.getMessage(err.error?.errors[0]?.msg);
        // }
        console.error('Error occurred:', err);
      },
    })
    sessionStorage.removeItem('token');
    // FIX ME : CHECK HERE USER TYPE 
    if (this.user.userType === 'user') {
      this._router.navigate(['/userPanel/signin'])
    }
  }

  moveTo(path: string) {
    if (!this._router.url.includes('settings')) {
      sessionStorage.setItem('homeUrl', JSON.stringify(this._router.url));
    }
    this._router.navigate([`/${this.rolePath}/${path}`]);
  }
  moveToWithId(data: any = { id: '', url: '' }) {
    this._router.navigate([`/${this.rolePath}/${data?.url}`, data?.id]);
  }

  moveToWithTwoId(data: any = { deptId: '', teamId: '', url: '' }) {
    this._router.navigate([`/${this.rolePath}/${data?.url}`, data?.deptId, data?.teamId])
  }

  moveBack() {
    // this.location.back()
    this.homeUrl = (sessionStorage.getItem('homeUrl' || ''));
    this.homeUrl = this.homeUrl.replace(/"/g, '');
    window.location.href = this.homeUrl;
    sessionStorage.setItem('homeUrl', JSON.stringify(''));
  }

  updateLayoutVisibility(): void {
    console.log(this._router.url);
    if (this._router.url.includes('signin')) {
      this.showPortalLayout = false;
    }
    else if (this._router.url.includes('settings')) {
      this.sidebar = 'admin-settings'
    }
    else {
      this.showPortalLayout = true;
      this.sidebar = 'normal'
    }
  }

}
