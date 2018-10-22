import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { SERVICES_URL } from 'src/app/config/config';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { UploadsService } from '../uploads/uploads.service';
import { UserService } from '../users/user.service';


@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _uploadsService: UploadsService,
    public _userService: UserService
  ) {
    this.token = this._userService.getFromStorage().token;
   }

   getHospitals(from: number = 0) {
     let url = SERVICES_URL + '/hospitals';
     if (from > 0) {
      url += '?from=' + from;
     }
     return this.http.get(url);
   }

   getHospital(id: string) {
     let url = SERVICES_URL + '/hospitals/' + id;
     return this.http.get(url).map( (res: any)=> {
       return res.hospital;
      });
   }

   updateHospital(hospital: Hospital) {
     let url = SERVICES_URL + '/hospitals/' + hospital._id;
     url += '?token=' + this.token;
     return this.http.put(url, hospital).map((res: any) => {
       swal('Hospital updated', res.hospital.name, 'success');
       return true;
     });
   }

   deleteHospital(hospital: Hospital) {
     let url = SERVICES_URL + '/hospitals/' + hospital._id + '?token=' + this.token;
     return this.http.delete(url).map( res => {
      swal('Hospital is gone', 'Hospital has been successfully deleted', 'success');
      return true;
     });
   }

   createHospital(hospital: Hospital) {
     // hospital.user = this.user;
     let url = SERVICES_URL + '/hospitals' + '?token=' + this.token;
     return this.http.post(url, hospital).map( (res: any) => {
       swal('Hospital created', res.hospital.name, 'success');
       return res.hospital;
     });
   }
}
