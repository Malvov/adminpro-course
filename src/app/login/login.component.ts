import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';
import { Subscriber } from 'rxjs';
declare function initPlugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./styles.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  rememberMe: boolean = false;
  auth2: any;

  constructor(
    public router: Router,
    public _userService: UserService
  ) { }

  ngOnInit() {
    initPlugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 0) {
      this.rememberMe = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '744889121302-f0mkulfulhngc7udc8cj75025omge3s4.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('google-plus-button'));
    });
  }
  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {

        let token = googleUser.getAuthResponse().id_token;
        // YOUR CODE HERE
        this._userService.googleLogIn(token).subscribe(
          () => {
            window.location.href = '#/dashboard';
          }
        );

      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  logIn(form: NgForm) {
    if (form.invalid) {
      return;
    }

    let user = new User(null, form.value.email, form.value.password);

    this._userService.login(user, this.rememberMe)
    .subscribe(() => { this.router.navigate(['/dashboard']); });

  }
}
