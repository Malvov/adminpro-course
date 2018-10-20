import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormModalService {

  public type: string;
  public id: string;
  public hidden: string = 'hidden';
  public notification = new EventEmitter<any>();

  constructor() { }

  hideModal() {
    console.log('hide modal');
    this.hidden = 'hidden';
    this.id = null;
    this.type = null;
  }

  showModal(type: string) {
    this.hidden = '';
    this.type = type;
  }
}
