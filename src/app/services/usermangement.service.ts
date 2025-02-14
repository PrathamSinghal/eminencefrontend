import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UsermangementService {
  constructor(private Http: HttpClient) { }

  getUserCount() {
    return this.Http.get(`${environment.base}user/private/userCount`);
  }
  getCities() {
    return this.Http.get(`${environment.base}master/islands`);
  }


  getGuestList() {
    return this.Http.get(`${environment.base}user/guest/getUser`);
  }

  blockUnblock(payloads: any) {
    return this.Http.post(
      `${environment.base}user/private/blockUnblock`,
      payloads
    );
  }

  deleteUsers(payloads: any) {
    return this.Http.post(
      `${environment.base}admin/private/deleteUsers`,
      payloads
    );
  }

  uploadImage(payload: any) {
    return this.Http.post(
      `${environment.base}fileUpload`, payload);

  }


  getUserList(payload: any) {
    return this.Http.post(`${environment.base}admin/private/getUsers?search=${payload?.queryParam?.search}&page=${payload?.queryParam?.page}&limit=${payload?.queryParam?.limit}`, payload?.body);
  }
  getManageDeviceList(userId: any) {
    return this.Http.get(`${environment.base}admin/private/getUserDetails/${userId}`);
  }
}
