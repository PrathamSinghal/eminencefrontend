import { Injectable, TemplateRef } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';
import { LoginService } from '../services/login.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router, private snackbarService: SnackbarService, private loginService: LoginService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((err) => {
                if (err.status === 401) {
                    // err.error.errors.forEach(
                    //     (element: any) => {
                    //         this.snackbarService.getMessage(element?.message);
                    //     }
                    // );
                    this.snackbarService.getMessage('You have logged out, Please login again');
                    this.router.navigate([`${'userPanel'}/signin`], { replaceUrl: true });
                    sessionStorage.removeItem('token');
                }
                else if (err.status === 403) {
                    // err.error.errors.forEach(
                    //     (element: any) => {
                    //         this.snackbarService.getMessage(element?.message);
                    //     }
                    // );
                    this.snackbarService.getMessage('Permission Denied!!');
                }
                else if (err.status === 503) {
                    // err.error.errors.forEach(
                    //     (element: any) => {
                    //         this.snackbarService.getMessage(element?.message);
                    //     }
                    // );
                    this.snackbarService.getMessage('Service Unavailable: Please try again later.');
                } else if (err.status === 0) {
                    /* Api Connection Refused*/
                    this.snackbarService.getMessage('Server not reachable!!');
                } else if (err.status === 404) {
                    this.snackbarService.getMessage('Not Found');
                }
                else if (err.status === 901) {
                    /*Permission is change */
                    this.snackbarService.getMessage('Permission changed!!');
                    // this.router.navigate([`${'userPanel'}/signin`], { replaceUrl: true });
                    // update user permission 
                    const sessionData = sessionStorage.getItem('token');
                    const data = !!sessionData ? JSON.parse(sessionData) : ''
                    const user = data?.data?.user;
                    this.loginService.updateUserPermission(user?._id).subscribe({
                        next: ((res: any) => {
                            window.location.reload();
                            // console.log("Login data",res)
                        })
                    })
                }
                return throwError(err);
            })
        );
    }
}
