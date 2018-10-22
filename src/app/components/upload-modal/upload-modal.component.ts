import { Component, OnInit } from '@angular/core';
import { UploadsService, ModalService } from '../../services/service.index';

@Component({
  selector: 'app-upload-modal',
  templateUrl: './upload-modal.component.html',
  styles: []
})
export class UploadModalComponent implements OnInit {

  file: File;
  tempFile: string;

  constructor(
    public _uploadsService: UploadsService,
    public _modalService: ModalService
  ) { }

  ngOnInit() {
  }

  chooseFile(fileToUpload) {
    if (!fileToUpload) {
      this.file = null;
      return;
    }

    if (fileToUpload.type.indexOf('image') < 0) {
      swal('Images only', 'Selected filed is not an image', 'warning');
      this.file = null;
      return;
    }

    this.file = fileToUpload;

    let reader = new FileReader();
    let urlTempFile = reader.readAsDataURL(fileToUpload);

    reader.onload = () => { this.tempFile = reader.result.toString(); };
  }

  async uploadFile() {
    let ok: boolean = false;
    await this._uploadsService.uploadFile(this.file, this._modalService.type, this._modalService.id)
    .then((res: any) => {
      this._modalService.notification.emit(res);
      (<HTMLInputElement>document.getElementById('image')).value = '';
      ok = true;
      this.hideModal();
    }).catch( error => {
      console.log('Error uploading file', error);
    });
    if (ok) {
      swal('Image uploaded successfully', '', 'success');
    }
  }

  hideModal() {
    this.tempFile = null;
    this.file = null;
    this._modalService.hideModal();
  }

}
