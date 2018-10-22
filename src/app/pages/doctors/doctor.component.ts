import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Doctor } from '../../models/doctor.model';
import { Hospital } from '../../models/hospital.model';
import { DoctorService, HospitalService, ModalService } from 'src/app/services/service.index';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: []
})
export class DoctorComponent implements OnInit {
  doctor: Doctor = new Doctor('', '', null, '', '');
  hospital: Hospital = new Hospital('');
  doctors: Doctor[] = [];
  hospitals: Hospital[] = [];
  doctorId: string = '';
  constructor(
    public _doctorService: DoctorService,
    public _hospitalService: HospitalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalService: ModalService
  ) {}

  ngOnInit() { 
    this.getHospitals();
    this.activatedRoute.params.subscribe( params => {
      this.doctorId = params['id'];
      if (this.doctorId !== 'new') {
        this.getDoctor(this.doctorId);
      }
    });
    this._modalService.notification.subscribe(res => {
      this.doctor.img = res.doctor.img;
    });
  }

  getDoctor(id: string) {
    this._doctorService.getDoctor(id).subscribe(doctor => {
      this.doctor = doctor;
      this.doctor.hospital = doctor.hospital._id;
      this.setHospital(this.doctor.hospital);
    });
  }

  saveDoctor(form: NgForm) {
    console.log(form.value);
    console.log(form.valid);
    if (form.valid && this.doctorId !== 'new') {
      this._doctorService.updateDoctor(this.doctor).subscribe(doctor => {
        this.doctor = doctor;
        this.router.navigate(['/doctors', doctor._id]);
      });
      return;
    }
    if (form.valid && this.doctorId === 'new') {
      this._doctorService.createDoctor(this.doctor)
      .subscribe(doctor => {
        this.doctor = doctor;
        this.router.navigate(['/doctors', doctor._id]);
      });
      return;
    }
  }

  getHospitals() {
    this._hospitalService.getHospitals().subscribe( (res: any) => {
      this.hospitals = res.hospitals;
    });
  }

  setHospital(value: string) {
   this._hospitalService.getHospital(value).subscribe( hospital => this.hospital = hospital );
  }

  showUploadModal() {
    this._modalService.showModal('doctors', this.doctorId, 'upload');
  }
  showHospitalsModal() {
    this._modalService.showModal('hospitals', '', 'select');
  }
}
