import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormModalService } from './form-modal.service';
import { HospitalService } from '../../services/service.index';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styles: []
})
export class FormModalComponent implements OnInit {

  name: string;
  hospital: Hospital;
  title: string;

  constructor(
    public _formModalService: FormModalService,
    public _hospitalService: HospitalService
  ) {}

  ngOnInit() {
  }

  hideModal() {
    this.hospital = null;
    this.name = '';
    this._formModalService.hideModal();
  }

  save() {
    if (this.name.length === 0 || !this.name) {
      return;
    }
    this.hospital = new Hospital(this.name);
    this._hospitalService.createHospital(this.hospital).subscribe( res => {
      this._formModalService.notification.emit(res);
      this.hideModal();
    });
  }

}
