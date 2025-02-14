import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _httpClient: HttpClient) { }

  // ========== Notification Management ============
  sendNotifications(payload: any) {
    return this._httpClient.post(`${environment.base}admin/private/sendNotifications`, payload);
  }
  getNotification(payload:any) {
    return this._httpClient.post(`${environment.base}admin/private/getNotifications?search=${payload?.queryParam?.search}&page=${payload?.queryParam?.page}&limit=${payload?.queryParam?.limit}`,payload?.body);
  }
  getAllUsers() {
    return this._httpClient.get(`${environment.base}admin/private/getAllUsers`);
  }
}
