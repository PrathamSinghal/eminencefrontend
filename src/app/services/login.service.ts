import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { ModuleAccess } from '../model/module-permission.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private moduleAccessList: ModuleAccess[] = [
    {
      moduleName: 'Dashboard',
      permissions: {
        view: false,
        add: false,
        edit: false,
        delete: false,
        blockUnblock: false,
        update: false
      }
    },
  ];
  private moduleAccessSubject = new BehaviorSubject<ModuleAccess[]>(this.moduleAccessList);
  moduleAccessList$ = this.moduleAccessSubject.asObservable();

  private rolePathSubject = new BehaviorSubject<string>('');
  rolePath$ = this.rolePathSubject.asObservable();

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  getModuleAccessList(): ModuleAccess[] {
    return this.moduleAccessSubject.getValue();
  }
  updateModuleAccessList(newList: ModuleAccess[]) {
    this.moduleAccessSubject.next(newList);
  }

  currentUserDetails: any
  private jwtHelper = new JwtHelperService();


  constructor(private _httpClient: HttpClient) {
    this.loggedinUserSession()
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('token') as string));
    this.currentUser = this.currentUserSubject.asObservable();
  }


  // loginAdminUser(payloads: any) {
  //   return this._httpClient.post(`${environment.base}admin/login`, payloads);
  // }

  loginAdminUser(payloads: any) {
    return this._httpClient.post(`${environment.base}user/login`, payloads).pipe(
      tap((response: any) => {
        console.log(response);
        sessionStorage.setItem('token', JSON.stringify(response));
        this.loggedinUserSession();
        this.currentUserSubject.next(response)
      })
    );
  }
  updateUserPermission(id: any) {
    return this._httpClient.get(`${environment.base}admin/getUserLoginData/${id}`).pipe(
      tap((response: any) => {
        sessionStorage.setItem('token', JSON.stringify(response));
        this.loggedinUserSession();
        this.currentUserSubject.next(response)
      })
    );
  }
  logoutAdminUser() {
    this.currentUserSubject.next(null);
    sessionStorage.removeItem('token');
    return this._httpClient.delete(`${environment.base}admin/private/logout`);
  }
  accountsLoginList() {
    return this._httpClient.get(
      `${environment.base}admin/private/accountsLogin`
    );
  }
  accountsLogoutById(id: any) {
    return this._httpClient.delete(
      `${environment.base}admin/private/signout/${id}`
    );
  }
  changePassword(payloads: any) {
    return this._httpClient.put(
      `${environment.base}admin/private/changePassword`,
      payloads
    );
  }
  profileUpdate(payloads: any) {
    return this._httpClient.put(
      `${environment.base}admin/private/editProfile`,
      payloads
    );
  }
  getUserDetailsById(payloads: any) {
    const id = payloads
    return this._httpClient.get(
      `${environment.base}user/private/userDetails/${id}`,
      payloads
    );
  }

  loggedinUserSession(): void {
    const sessionData = sessionStorage.getItem('token');
    if (sessionData) {
      const data = JSON.parse(sessionData);
      this.currentUserDetails = data?.data?.user;
      // if (this.currentUserDetails?.userType === 'departmentAdmin' || this.currentUserDetails?.userType === 'departmentTeamMember') {
      //   this.currentUserDetails?.userType === 'departmentAdmin' ? this.updateModuleAccessList([...data.data.permission.departmentAdminModules]) : this.updateModuleAccessList([...data.data.permission?.teamAdminModules])
      // }
      this.rolePathSubject.next(this.getRolePath());
    }
  }

  modulePermission(moduleName: string, permission: string): Observable<boolean> {
    if (this.currentUserDetails?.userType !== 'user') {
      return this.moduleAccessList$.pipe(
        map((list) => {
          const module = list.find(mod => mod.moduleName === moduleName);
          return module ? module.permissions[permission] === true : false;
        })
      );
    }
    return new Observable<boolean>((observer) => {
      observer.next(true);
      observer.complete();
    });
  }

  private getRolePath(): string {
    return this.currentUserDetails?.userType === 'user'
      ? 'userPanel'
      : ''
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  isTokenExpired(token: any) {
    return this.jwtHelper.isTokenExpired(token);
  }

  public get getToken() {
    let data: any = JSON.parse(sessionStorage.getItem('token') as string);
    return data?.data.accessToken;
  }
}
