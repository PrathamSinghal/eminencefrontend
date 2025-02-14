import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(private Http: HttpClient) { }

  getDepartmentList(payload: any) {
    return this.Http.get(`${environment.base}admin/private/getDepartment?page=${payload?.queryParam?.page}&limit=${payload?.queryParam?.limit}`);
  }
  // createDepartment(payload: any) {
  //   return this.Http.post(`${environment.base}admin/private/addDepartment`, payload);
  // }
  createDepartment(payload: any) {
    return this.Http.post(`${environment.base}admin/private/createDepartment`, payload);
  }
  deptDetailsById(id: any) {
    return this.Http.get(`${environment.base}admin/private/deptDetailsById/${id}`);
  }
  createUser(payload: any) {
    return this.Http.post(`${environment.base}admin/private/signup`, payload);
  }
  blockUnblock(payloads: any) {
    return this.Http.post(
      `${environment.base}admin/private/blockUnblockDept`,
      payloads
    );
  }
  deleteDept(payloads: any) {
    return this.Http.post(
      `${environment.base}admin/private/deleteDept`,
      payloads
    );
  }


  getLogs(id: string) {
    // return this.Http.get(`${environment.base}admin/private/logs/${id}`);
    return this.Http.get(`${environment.base}admin/private/getUserLogs/${id}`);
  }


  updateDepartment(id: any, payloads: any) {
    return this.Http.patch(
      `${environment.base}admin/private/updateDepartment/${id}`,
      payloads
    );
  }
  deptUpdateUserProfile(id: any, payloads: any) {
    return this.Http.patch(
      `${environment.base}admin/private/deptUpdateUserProfile/${id}`,
      payloads
    );
  }

  updateStatus(payload: any) {
    return this.Http.put(
      `${environment.base}admin/private/changeStatus/${payload?.id}`,
      payload?.data
    );
  }
  resendInvite(payload: any) {
    return this.Http.put(
      `${environment.base}admin/private/resendInvitaion/${payload?.id}`,
      payload?.data
    );
  }
}
