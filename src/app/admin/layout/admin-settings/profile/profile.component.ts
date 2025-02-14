import { Component, OnInit } from '@angular/core';
import { SnackbarService } from '../../../../services/snackbar.service';
import { Router } from '@angular/router';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { LoginService } from '../../../../services/login.service';
import { SessionService } from '../../../../services/session.service';
import { UsermangementService } from '../../../../services/usermangement.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  profilePictureUrl: string = 'assets/images/profileDummy.png'

  constructor(
    private _loginService: LoginService,
    private SnackbarService: SnackbarService,
    private _router: Router,
    private _fb: FormBuilder,
    private _sessionService: SessionService,
    private _umService: UsermangementService
  ) {
    this.formInitialization()
  }

  ngOnInit(): void {
    this.getUserDetails();
  }
  moveTo(path: string) {
    this._router.navigate([path]);
  }

  onProfilePictureChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profilePictureUrl = e.target.result;
      };
      reader.readAsDataURL(file);
      this.uploadImage(file);
    }
  }
  uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    this._umService.uploadImage(formData).subscribe({
      next: (res: any) => {
        if (res.status == 200) {
          // this.SnackbarService.getMessage(res?.message);
          this.profilePictureUrl = !!res?.data?.imageUrl ? res?.data?.imageUrl : this.profilePictureUrl
          console.log(res?.imageUrl)
          this.profileForm.patchValue({
            profileImage: res?.data?.imageUrl
          })
        }

      },
      error: (err: any) => {
        console.log(err.error)
      }
    });
  }

  formInitialization() {
    // const formOptions: AbstractControlOptions = {
    //   validators: this.passwordMatchValidator,
    // };

    this.profileForm = this._fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        lastName: [''],
        email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
        profileImage: [''],
      },
      // { validator: this.passwordMatchValidator }
    );
  }

  // passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  //   const form = control as FormGroup;
  //   const newPassword = form.get('newPassword')?.value;
  //   const confirmPassword = form.get('confirmPassword')?.value;
  //   return newPassword === confirmPassword ? null : { mismatch: true };
  // };

  onSubmit(): void {
    console.log(this.profileForm.value)
    if (!this.profileForm.valid) {
      this.profileForm.markAllAsTouched();
      return;
    }
    this.profileForm.patchValue({
      profileImage: this.profilePictureUrl
    })

    const { firstName, lastName, email, profileImage } = this.profileForm.value;
    console.log('Profile data:', firstName, lastName, email, profileImage);
    const payload = {
      firstName: firstName?.trim(),
      lastName: lastName?.trim(),
      email: email?.trim(),
      profileImage: profileImage || ''
    }
    this._loginService.profileUpdate(payload).subscribe({
      next: (response: any) => {
        if (response.message) {
          this.SnackbarService.getMessage(response.message);
        }
        this.getUserDetails();
      },
      error: (err) => {
        // console.log(err);

        if (err.error) {
        }
        // this.SnackbarService.getMessage('Something went wrong!!');
      },
    })
  }


  getUserDetails() {
    const user = this._sessionService?.getUserDetails();
    this._loginService.getUserDetailsById(user?._id).subscribe({
      next: (response: any) => {
        this.profilePictureUrl = !!response?.data?.user?.profileImage ? response?.data?.user?.profileImage : this.profilePictureUrl
        console.log(this.profilePictureUrl)
        console.log(response?.data?.user?.profileImage)
        this.profileForm.patchValue({
          profileImage: response?.data?.user?.profilePictureUrl,
          firstName: response?.data?.user?.firstName,
          lastName: response?.data?.user?.lastName,
          email: response?.data?.user?.email,
        })
        // if (response.message) {
        //   this.SnackbarService.getMessage(response.message);
        // }
      },
      error: (err) => {
        // console.log(err);

        if (err.error) {
        }
        // this.SnackbarService.getMessage('Something went wrong!!');
      },
    })


  }

}



