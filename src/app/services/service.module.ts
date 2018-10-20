import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UploadModalService } from '../components/upload-modal/upload-modal.service';
import { FormModalService } from '../components/form-modal/form-modal.service';
import {
  SettingsService,
  SidebarService,
  SharedService,
  UserService,
  LoginGuard,
  UploadsService,
  HospitalService,
  DoctorService
} from './service.index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UserService,
    HospitalService,
    UploadsService,
    UploadModalService,
    FormModalService,
    DoctorService,
    LoginGuard
  ]
})
export class ServiceModule { }
