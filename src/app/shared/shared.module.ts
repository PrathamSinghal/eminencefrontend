import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HeaderPortalComponent } from './header-portal/header-portal.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Material
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NoRecordFoundComponent } from './no-record-found/no-record-found.component';
import { DatePipePipe } from '../pipe/date-pipe.pipe';
import { SidebarAdminSettingsComponent } from './sidebar-admin-settings/sidebar-admin-settings.component';
import { PaginationComponent } from './pagination/pagination.component';
import { NoDataFoundComponent } from './no-data-found/no-data-found.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerComponent } from './spinner/spinner.component';
import { ShowGridActionDirective } from '../customDirectives/show-grid-action.directive';
import { ModulePermissionDirective } from '../customDirectives/module-permission.directive';
import { CompHeaderComponent } from './comp-header/comp-header.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { TableItemsComponent } from './table-items/table-items.component';
import { LanguagePipe } from '../customPipes/language.pipe';
import { DeviceListComponent } from './device-list/device-list.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SharedPopupComponent } from './shared-popup/shared-popup.component';
import { CustomModalComponent } from './custom-modal/custom-modal.component';

export class AppModule { }


@NgModule({
  declarations: [
    HeaderPortalComponent,
    NavigationComponent,
    SidebarComponent,
    NoRecordFoundComponent,
    DatePipePipe,
    SidebarAdminSettingsComponent,
    PaginationComponent,
    NoDataFoundComponent,
    NoDataFoundComponent,
    SpinnerComponent,
    ShowGridActionDirective,
    ModulePermissionDirective,
    CompHeaderComponent,
    CompHeaderComponent,
    SearchInputComponent,
    TableItemsComponent,
    LanguagePipe,
    DeviceListComponent,
    SharedPopupComponent,
    CustomModalComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatInputModule,
    MatTableModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    FormsModule,
    NgMultiSelectDropDownModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    CKEditorModule

  ],
  providers: [DatePipe],

  exports: [
    NavigationComponent, MatIconModule, ReactiveFormsModule, MatSnackBarModule, MatInputModule, MatTableModule, MatCheckboxModule,
    NoRecordFoundComponent,
    PaginationComponent,
    DatePipePipe,
    NoDataFoundComponent,
    MatProgressSpinnerModule,
    SpinnerComponent,
    ShowGridActionDirective,
    ModulePermissionDirective,
    CompHeaderComponent,
    SearchInputComponent,
    TableItemsComponent,
    LanguagePipe,
    FormsModule,
    DeviceListComponent,
    NgMultiSelectDropDownModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    CKEditorModule,
    SharedPopupComponent,
    CustomModalComponent
  ]
})
export class SharedModule { }
