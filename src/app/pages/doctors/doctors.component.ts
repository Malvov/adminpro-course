import { Component, OnInit } from '@angular/core';
import { Doctor } from '../../models/doctor.model';
import { DoctorService } from '../../services/service.index';
import { UploadModalService } from '../../components/upload-modal/upload-modal.service';

declare var swal: any;

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: []
})
export class DoctorsComponent implements OnInit {

  loading: boolean = false;
  from: number = 0;
  doctorsCount: number = 0;
  doctors: Doctor[] = [];

  constructor(
    public _doctorService: DoctorService,
    public _uploadModalService: UploadModalService
  ) { }

  ngOnInit() {
    this.getDoctors();
    this._uploadModalService.notification.subscribe(res => this.getDoctors());
  }

  getDoctors() {
    this._doctorService.getDoctors(this.from).subscribe((res: any) => {
      this.doctors = res.doctors;
      this.doctorsCount = res.count;
      this.loading = false;
    });

  }

  searchDoctor(term: string) {
    if (term.length <= 0) {
      this.getDoctors();
      return;
    }
    this.loading = true;
    this._doctorService.searchDoctors(term).subscribe( (doctors: Doctor[]) => {
      this.doctors = doctors;
      this.loading = false;
    });
  }

  paginate(value: number) {

    let page = this.from + value;

    console.log(page);

    if (page >= this.doctorsCount) {
      return;
    }

    if (page < 0) {
      return;
    }

    this.from += value;
    this.getDoctors();
  }

  showUploadModal(id: string) {
    this._uploadModalService.showModal('doctors', id);
  }

  saveDoctor(doctor: Doctor) {
    this._doctorService.updateDoctor(doctor).subscribe();
  }

  deleteDoctor(doctor: Doctor) {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover ' + doctor.name,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this._doctorService.deleteDoctor(doctor).subscribe( res => {
          console.log(res);
          this.getDoctors();
        });
      }
    });
  }

}
