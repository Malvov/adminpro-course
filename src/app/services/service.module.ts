import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UploadModalService } from '../components/upload-modal/upload-modal.service';


import {
  SettingsService,
  SidebarService,
  SharedService,
  UserService,
  LoginGuard,
  UploadsService
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
    UploadsService,
    UploadModalService,
    LoginGuard
  ]
})
export class ServiceModule { }
