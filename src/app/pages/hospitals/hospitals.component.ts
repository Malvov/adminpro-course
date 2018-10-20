import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/service.index';
import { Hospital } from '../../models/hospital.model';
import { UploadModalService } from '../../components/upload-modal/upload-modal.service';
import { FormModalService } from '../../components/form-modal/form-modal.service';

declare var swal: any;

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: []
})
export class HospitalsComponent implements OnInit {

  hospitals: Hospital[] = [];
  loading: boolean = true;
  hospitalsCount: number = 0;
  from: number = 0;

  constructor(
    public _hospitalService: HospitalService,
    public _uploadModalService: UploadModalService,
    public _formModalService: FormModalService
  ) { }

  ngOnInit() {
    this.getHospitals();
    this._uploadModalService.notification.subscribe(res => this.getHospitals());
    this._formModalService.notification.subscribe(res => this.getHospitals());
  }

  getHospitals() {
    this.loading = true;
    this._hospitalService.getHospitals(this.from).subscribe((res: any) => {
      console.log(res);
      this.hospitals = res.hospitals;
      this.hospitalsCount = res.count;
      this.loading = false;
    });
  }

  paginate(value: number) {
    let page = this.from + value;

    console.log(page);

    if (page >= this.hospitalsCount) {
      return;
    }

    if (page < 0) {
      return;
    }

    this.from += value;
    this.getHospitals();
  }

  searchHospitals(term: string) {
    if (term.length <= 0) {
      this.getHospitals();
      return;
    }

    this.loading = true;

    this._hospitalService.searchHospitals(term).subscribe( (hospitals: Hospital[]) => {
      this.hospitals = hospitals;
      this.loading = false;
    });
  }

  saveHospital(hospital) {
    this._hospitalService.updateHospital(hospital).subscribe();
  }

  deleteHospital(hospital) {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover ' + hospital.name,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this._hospitalService.deleteHospital(hospital).subscribe( res => {
          console.log(res);
          this.getHospitals();
        });
      }
    });
  }

  showUploadModal(id: string) {
    this._uploadModalService.showModal('hospitals', id);
  }

  showFormModal() {
    this._formModalService.showModal('hospital');
  }

}
