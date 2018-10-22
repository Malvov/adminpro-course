import { Component, OnInit } from '@angular/core';
import { Doctor } from '../../models/doctor.model';
import { DoctorService, SearchService, ModalService } from '../../services/service.index';


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
    public _searchService: SearchService,
    public _modalService: ModalService
  ) { }

  ngOnInit() {
    this.getDoctors();
    this._modalService.notification.subscribe(res => this.getDoctors());
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
    this._searchService.searchDoctors(term).subscribe( (doctors: Doctor[]) => {
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
    this._modalService.showModal('doctors', id, 'upload');
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
