import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Doctor } from '../../models/doctor.model';
import { SERVICES_URL } from '../../config/config';
import { UserService } from '../users/user.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  token: string;

  constructor(
    public http: HttpClient,
    public _userService: UserService
  ) { this.token = this._userService.getFromStorage().token; }

  getDoctors(from: number = 0) {
    let url = SERVICES_URL + '/doctors?from=' + from;
    return this.http.get(url).map(res => {
      return res;
    });
  }

  getDoctor(id: string) {
    let url = SERVICES_URL + '/doctors/' + id;
    return this.http.get(url).map( (res: any) => res.doctor);
  }

  updateDoctor(doctor: Doctor) {
    let url = SERVICES_URL + '/doctors/' + doctor._id;
    url += '?token=' + this.token;
    return this.http.put(url, doctor).map((res: any) => {
      swal('Doctor updated', res.doctor.name, 'success');
      return res.doctor;
    });
  }

  deleteDoctor(doctor: Doctor) {
    let url = SERVICES_URL + '/doctors/' + doctor._id + '?token=' + this.token;
    return this.http.delete(url).map((res: any) => {
      swal('Doctor is gone', res.doctor.name + ' has been successfully deleted', 'success');
      return true;
    });
  }

  createDoctor(doctor: Doctor) {
    // doctor.hospital = '5bc95ee37d20595c7b15665d';
    let url = SERVICES_URL + '/doctors?token=' + this.token;
    return this.http.post(url, doctor).map( (res: any) => {
      swal('Doctor created', res.doctor.name + ' has been successfully created', 'success');
      return res.doctor;
    });
  }
}
