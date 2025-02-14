import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { SessionService } from '../services/session.service';
import  {LoaderServiceService} from '../services/loader-service.service'

@Injectable()
export class Auth implements HttpInterceptor {
  constructor(private sessionService: SessionService,private loader: LoaderServiceService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.loader.showLoader();
    let item_data = this.sessionService?.getSessionItems();
    let modifiedReq: any;
      const userToken = item_data?.data?.accessToken;
      modifiedReq = request.clone({
        headers: request.headers.set('Authorization',`Bearer ${userToken}`),
      });
    
      if(!userToken)
      {
        this.sessionService.logout()
      }

    return next.handle(modifiedReq).pipe(
      finalize(() => this.loader.hideLoader())
    );;
  }
}
