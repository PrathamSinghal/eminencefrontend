import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private _httpClient: HttpClient) { }

  // ========== Master API ============
  getLanguages() {
    return this._httpClient.get(`${environment.base}master/languages`);
  }
  getCities() {
    return this._httpClient.get(`${environment.base}master/islands`);
  }
  uploadImage(payload: any) {
    return this._httpClient.post(
      `${environment.base}fileUpload`, payload);

  }


}



