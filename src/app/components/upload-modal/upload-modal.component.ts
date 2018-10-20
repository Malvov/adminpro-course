import { Component, OnInit } from '@angular/core';
import { UploadsService } from '../../services/uploads/uploads.service';
import { UploadModalService } from './upload-modal.service';

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
    public _uploadModalService: UploadModalService
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
    await this._uploadsService.uploadFile(this.file, this._uploadModalService.type, this._uploadModalService.id)
    .then((res: any) => {
      this._uploadModalService.notification.emit(res);
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
    this._uploadModalService.hideModal();
  }

}
