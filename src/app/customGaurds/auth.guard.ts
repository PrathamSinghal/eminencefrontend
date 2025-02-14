import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  Route,
} from '@angular/router';
import { LoginService } from '../services/login.service';
import { SnackbarService } from '../services/snackbar.service';
import { take } from 'rxjs';
// import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private loginService: LoginService,
    private snackbarService: SnackbarService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.loginService.getToken;
    if (token && token != null && token !== '' && !this.loginService.isTokenExpired(token)) {
      return this.checkUserPermission(route, state);
    } else {
      // this.snackbarService.getMessage("Token Expired!!");
      // FIX ME : Check here for key like userPanel, team , department 
      const url = state.url;
      let rolePath = url.includes('/userPanel/') ? 'userPanel' : url.includes('/team/') ? 'team' : 'department';
      this.router.navigate([`${rolePath}/signin`])
      this.loginService.logoutAdminUser();
      return false;
    }
  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  checkUserPermission(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let isValidUrl: boolean = false;
    let allowedUrl = ''
    this.loginService.rolePath$.pipe(take(1)).subscribe(path => {
      const url = state.url
      allowedUrl = path;
      if (url.includes(`/${path}/`)) {
        isValidUrl = true;
      }
    });
    if (!isValidUrl) {
      this.snackbarService.getMessage("You are not allowed to use this url and redirected to authorized one");
      this.router.navigate([`${allowedUrl}/signin`]);
    }
    return isValidUrl;
  }
}
