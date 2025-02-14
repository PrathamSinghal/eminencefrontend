import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder,
} from '@angular/forms';

import { LoginService } from '../../services/login.service';
import { SnackbarService } from '../../services/snackbar.service';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent implements OnInit {
  isshowPassword: boolean = false;
  SiginForm: any;
  errorMessage = signal('');
  loginType: String = ''
  loginText: String = ''
  constructor(
    private _router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.SiginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.checkLoginType()
  }

  checkLoginType() {
    const currentUrl = this._router.url;
    switch (true) {
      case currentUrl.includes('userPanel/signin'):
        this.loginType = 'user';
        this.loginText = "User"
        break;
      case currentUrl.includes('userPanel/signin'):
        this.loginType = 'user';
        this.loginText = "User"
        break;
      case currentUrl.includes('department/signin'):
        this.loginType = 'department';
        this.loginText = "Department"
        break;
      case currentUrl.includes('team/signin'):
        this.loginType = 'team';
        this.loginText = "Team"
        break;
      default:
    }
  }



  async onSignin() {
    if (this.SiginForm.invalid) {
      this.SiginForm.markAllAsTouched();
      this.snackbarService.getMessage('Please Enter Valid Email and Password');
      return;
    } else {
      const fpPromise = FingerprintJS.load();
      const fp = await fpPromise;
      const result = await fp.get();
      const deviceId = result?.visitorId;


      let payloads = {
        email: this.SiginForm.get('email').value,
        password: this.SiginForm.get('password').value,
        userType: 'departmentAdmin',
        deviceType: '1',
        deviceName: navigator.platform,
        deviceId: deviceId

      };
      this.loginService.loginAdminUser(payloads).subscribe({
        next: (data: any) => {
          // if (data.status === 1) {
          let item_data = JSON.stringify(data);
          sessionStorage.setItem('token', item_data);
          if (data?.data?.user?.userType === 'user') {
            this._router.navigate(['/userPanel/dashboard'], { replaceUrl: true });
          }
          // }
          if (data?.status === 0) {
            this.snackbarService.getMessage(data?.message);
          }
        },
        error: (err) => {
          if (err.error) {
            this.snackbarService.getMessage(err.error?.errors[0]?.msg);
          }
          console.error('Error occurred:', err);
        },
      });
    }
  }

  getValue(fielderror: any): any {
    if (fielderror.errors.required) {
      return 'You must enter a value';
    } else fielderror.errors.invalid;
    {
      return 'Not a valid email';
    }
  }
}
