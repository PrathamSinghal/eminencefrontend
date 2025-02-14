import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private _httpClient: HttpClient) { }

  // ========== Dashboard Service ============
  dashboard(payload: any) {
    return this._httpClient.post(`${environment.base}admin/private/dashboard`, payload);
  }
}
