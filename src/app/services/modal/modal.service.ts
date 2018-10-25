import { Injectable, EventEmitter } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable, Subject } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  public type: string;
  public id: string;
  public modalType: string;
  public uploadHidden: string = 'upload-hidden';
  public selectHidden: string = 'select-hidden';
  public notification = new EventEmitter<any>();
  public document: any;

  private typeSubject: Subject<string>;
  public typeToObserve: Observable<string>;

  constructor(

  ) {
    this.typeSubject = new Subject<string>();
    this.typeToObserve = this.typeSubject.asObservable();
  }

  hideModal() {
    console.log('hide modal');
    this.selectHidden = 'select-hidden';
    this.uploadHidden = 'upload-hidden';
    this.id = null;
    this.type = null;
    if (this.modalType === 'select') {
      this.notification.emit(this.document);
    }
    this.modalType = null;
    // this.document = null;
  }

  showModal(type: string, id: string, modalType: string) {
    switch (modalType) {
      case 'upload':
        this.uploadHidden = '';
        break;
      case 'select':
        this.selectHidden = '';

        break;
    }
    this.id = id;
    this.type = type;
    this.modalType = modalType;
    this.typeSubject.next(this.type);
  }
}
