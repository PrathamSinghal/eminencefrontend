import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SessionService {
  myObservableArray: Observable<any[]> = new Observable<any[]>();

  constructor(private _router: Router) { }

  getSessionItems() {
    let data = sessionStorage.getItem('token');
    if (data) {
      return JSON.parse(data);
    } else {
      this.logout();
    }
  }

  logout() {
    sessionStorage.removeItem('token');
    this._router.navigate(['/userPanel/signin']);
  }

  getUserDetails() {
    return this.getSessionItems()?.data?.user;
  }
  
  getPermissions() {
    let data: any = sessionStorage.getItem('token');
    if (data) {
      const result = JSON.parse(data);
      if (result.data.user.userType === 'departmentAdmin') {
        return JSON.parse(data)?.data?.permission?.departmentAdminModules
      }
      if (result.data.user.userType === 'departmentTeamMember') {
        return JSON.parse(data)?.data?.permission?.teamAdminModules
      }
    }
    return []
  }

  get getRolePath() {
    return this.getUserDetails().userType == 'user' ? 'userPanel' : 'team'
  }
}
