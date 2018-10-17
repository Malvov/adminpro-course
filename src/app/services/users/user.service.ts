import { Injectable, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { SERVICES_URL } from 'src/app/config/config';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { UploadsService } from '../uploads/uploads.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _uploadFile: UploadsService
  ) {
    this.getFromStorage();
   }

   isLoggedIn() {
     return (this.token.length > 5) ? true : false;
   }


   getFromStorage() {
     if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
     } else {
       this.token = '';
       this.user = null;
     }
   }

   setInStorage(id: string, token: string, user: User) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
    this.token = token;
   }

   createUser(user: User) {

    let url = SERVICES_URL + '/users';
    return this.http.post(url, user).map(
      (res: any) => {
        swal('User created', user.email, 'success');
        return res.user;
      });
   }

   updateUser(user: User) {
     let url = SERVICES_URL + '/users/' + user._id;
     url += '?token=' + this.token;
     
     return this.http.put(url, user).map(
       (res: any) => {
         this.setInStorage(res.user._id, this.token, res.user);
         swal('User updated', this.user.name, 'success');
         return;
       });
   }
   uploadFile(file: File, id: string) {
     this._uploadFile.uploadFile(file, 'users', id).then(
       (res: any) => {
         this.user.img = res.user.img;
         swal('Image uploaded successfully', this.user.name, 'success');
         this.setInStorage(id, this.token, this.user);
       }).catch(error => {
         console.log(error);
        });
   }
   // ===============================================================================
   // ===============================================================================
   // ===============================================================================
   // LOGIN FUNCTIONS
   // ===============================================================================
   // ===============================================================================
   // ===============================================================================

   googleLogIn(token: string) {
     let url = SERVICES_URL + '/login/google';
     return this.http.post(url, {token}).map(
       (res: any) => {
         this.setInStorage(res.id, res.token, res.user);
         return true;
       }
     );
   }

   login(user: User, rememberMe: boolean = false) {

    if (rememberMe) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = SERVICES_URL + '/login';
    return this.http.post(url, user).map(
      (res: any) => {
        this.setInStorage(res.id, res.token, res.user);
        return true;
      }
    );
   }

   logOut() {
     this.user = null;
     this.token = '';
     localStorage.removeItem('token');
     localStorage.removeItem('user');
     this.router.navigate(['/login']);
   }
}
