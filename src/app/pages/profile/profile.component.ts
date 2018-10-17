import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/service.index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  user: User;
  file: File;
  tempFile: string;

  constructor(
    public _userService: UserService
  ) {

    this.user = this._userService.user;

   }

  ngOnInit() {
  }

  save(user: User) {

    this.user.name = user.name;
    if (!this.user.google) {
      this.user.email = user.email;
    }

    this._userService.updateUser(this.user).subscribe();
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

  uploadFile() {
    this._userService.uploadFile(this.file, this.user._id);
  }

}
