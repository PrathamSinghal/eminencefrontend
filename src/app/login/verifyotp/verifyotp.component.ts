import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-verifyotp',
  templateUrl: './verifyotp.component.html',
  styleUrl: './verifyotp.component.scss'
})
export class VerifyotpComponent implements OnInit {
  isshowPassword: boolean = false;
  VerifyOtpForm: any;
  errorMessage = signal('');
  loginType: String = ''
  loginText: String = ''
  userId: any = '';
  constructor(
    private _router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private snackbarService: SnackbarService,
    private activatedRoute: ActivatedRoute,

  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
        this.userId = params.get('id');
    });
     
   }

  ngOnInit(): void {
    this.VerifyOtpForm = this.formBuilder.group({
      otp: ['', Validators.required],
    });
    this.checkLoginType()
  }

  checkLoginType() {
    const currentUrl = this._router.url;
    switch (true) {
      case currentUrl.includes('userPanel/verifyotp'):
        this.loginType = 'user';
        this.loginText = "User"
        break;
      case currentUrl.includes('userPanel/verifyotp'):
        this.loginType = 'user';
        this.loginText = "User"
        break;
      case currentUrl.includes('department/verifyotp'):
        this.loginType = 'department';
        this.loginText = "Department"
        break;
      case currentUrl.includes('team/verifyotp'):
        this.loginType = 'team';
        this.loginText = "Team"
        break;
      default:
    }
  }

  moveTo(path: string) {
    this._router.navigate([`/userPanel/${path}`]);
  }



  async onVerifyOtp() {
    if (this.VerifyOtpForm.invalid) {
      this.VerifyOtpForm.markAllAsTouched();
      this.snackbarService.getMessage('Please Enter Valid Email and Password');
      return;
    } else {
      const fpPromise = FingerprintJS.load();
      const fp = await fpPromise;
      const result = await fp.get();
      const deviceId = result?.visitorId;


      let payloads = {
        otp: this.VerifyOtpForm.get('otp').value.toString(),
        _id: this.userId
      };

      console.log(payloads);
      this.loginService.verifyOtpUser(payloads).subscribe({
        next: (data: any) => {

            let item_data = JSON.stringify(data);
            sessionStorage.setItem('token', item_data);

            this._router.navigate(['/userPanel/dashboard'], { replaceUrl: true });
            this.snackbarService.getMessage(data?.message);
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
