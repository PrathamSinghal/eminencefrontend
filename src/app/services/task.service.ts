import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private _httpClient: HttpClient) { }
  // ========== Task ============

  getAllTasks(payload: any) {
    return this._httpClient.post(`${environment.base}user/private/getAllTasks?search=${payload?.queryParam?.search}&page=${payload?.queryParam?.page}&limit=${payload?.queryParam?.limit}`, payload?.body);
  }
  createTask(payload: any) {
    return this._httpClient.post(`${environment.base}user/private/createTask`, payload);
  }
  getTaskById(payload: any) {
    return this._httpClient.get(`${environment.base}user/private/getTask/${payload?.id}`);
  }
  updateTask(payload: any, id:any) {
    return this._httpClient.post(`${environment.base}user/private/updateTask/${id}`, payload);
  }



  deleteAdvertisement(payload: any) {
    return this._httpClient.post(`${environment.base}admin/private/deleteAdvertisement`, payload);
  }
  blockUnblockAdvertisement(payload: any) {
    return this._httpClient.post(`${environment.base}admin/private/blockUnblockAdvertisement`, payload);
  }
  
  getAllAdvertiser() {
    return this._httpClient.get(`${environment.base}admin/private/getAllAdvertiser`);
  }

}


