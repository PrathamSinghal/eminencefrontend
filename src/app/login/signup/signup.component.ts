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
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  isshowPassword: boolean = false;
  SigupForm: any;
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
    this.SigupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      username: ['', Validators.required],
    });
    this.checkLoginType()
  }

  checkLoginType() {
    const currentUrl = this._router.url;
    switch (true) {
      case currentUrl.includes('userPanel/signup'):
        this.loginType = 'user';
        this.loginText = "User"
        break;
      case currentUrl.includes('userPanel/signup'):
        this.loginType = 'user';
        this.loginText = "User"
        break;
      case currentUrl.includes('department/signup'):
        this.loginType = 'department';
        this.loginText = "Department"
        break;
      case currentUrl.includes('team/signup'):
        this.loginType = 'team';
        this.loginText = "Team"
        break;
      default:
    }
  }

  moveTo(path: string) {
    this._router.navigate([`/userPanel/${path}`]);
  }

  moveToWithId(data: any = { id: '', url: '' }) {
    this._router.navigate([`/userPanel/${data?.url}`, data?.id]);
  }



  async onSignup() {
    if (this.SigupForm.invalid) {
      this.SigupForm.markAllAsTouched();
      this.snackbarService.getMessage('Please Enter Valid Email and Password');
      return;
    } else {
      const fpPromise = FingerprintJS.load();
      const fp = await fpPromise;
      const result = await fp.get();
      const deviceId = result?.visitorId;


      let payloads = {
        email: this.SigupForm.get('email').value,
        username: this.SigupForm.get('username').value,
        password: this.SigupForm.get('password').value,
        userType: 'user',
        deviceType: '1',
        deviceName: navigator.platform,
        deviceId: deviceId

      };

      console.log(payloads);
      this.loginService.signupUser(payloads).subscribe({
        next: (data: any) => {
          console.log(data,"fwefwefwe");
          this.moveToWithId({id: data?.data?._id, url: 'verifyotp'})
          // this._router.navigate(['/userPanel/verifyotp'], { replaceUrl: true });
          if (data?.status === 200) {
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
