import { Component, OnInit } from '@angular/core';
import { HospitalService, SearchService, ModalService } from '../../services/service.index';
import { Hospital } from '../../models/hospital.model';


declare var swal: any;

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: []
})
export class HospitalsComponent implements OnInit {

  hospitals: Hospital[] = [];
  hospital: Hospital = new Hospital('');
  loading: boolean = true;
  hospitalsCount: number = 0;
  from: number = 1;

  constructor(
    public _hospitalService: HospitalService,
    public _searchService: SearchService,
    public _modalService: ModalService
  ) { }

  ngOnInit() {
    this.getHospitals();
    this._modalService.notification.subscribe(res => this.getHospitals());
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

    this._searchService.searchHospitals(term).subscribe( (hospitals: Hospital[]) => {
      this.hospitals = hospitals;
      this.loading = false;
    });
  }

  updateHospital(hospital) {
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
    this._modalService.showModal('hospitals', id, 'upload');
  }

  createHospitalModal() {
    swal({
      title: 'Create hospital',
      text: 'Type hospital name',
      content: 'input',
      icon: 'info',
      buttons: true
    }).then( (value: string ) => {

      if ( !value || value.length === 0 ) {
        return;
      }
      this.hospital.name = value;
      this._hospitalService.createHospital(this.hospital)
              .subscribe( () => this.getHospitals() );

    });
  }

}
