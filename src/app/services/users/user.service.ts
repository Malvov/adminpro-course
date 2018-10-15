import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { SERVICES_URL } from 'src/app/config/config';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router
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
