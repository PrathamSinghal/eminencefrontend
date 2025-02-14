import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminSettingsRoutingModule } from './admin-settings-routing.module';
import { AdminSettingsComponent } from './admin-settings.component';
import { SharedModule } from '../../../shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { FormGroup } from '@angular/forms';


@NgModule({
  declarations: [
    AdminSettingsComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    AdminSettingsRoutingModule,
    SharedModule,
    
  ]
})
export class AdminSettingsModule { }
