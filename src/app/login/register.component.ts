import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

declare function initPlugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './styles.component.css' ]
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  constructor(
    public _userService: UserService,
    public router: Router
  ) { }

  fieldsMatch( firstField: string, secondField: string) {
    return (group: FormGroup) => {

      let first = group.controls[firstField].value;
      let second = group.controls[secondField].value;

      if (first === second) {
        return null;
      } else {
        return {notMatch: true};
      }
    };
  }

  ngOnInit() {
    initPlugins();
    this.form = new FormGroup({
      name: new FormControl( null, Validators.required),
      email: new FormControl( null, [Validators.required, Validators.email] ),
      password: new FormControl( null, Validators.required ),
      passwordConfirmation: new FormControl( null, Validators.required ),
      conditions: new FormControl(false)
    }, { 
      validators: this.fieldsMatch('password', 'passwordConfirmation')
    });

    this.form.setValue({
      name: 'Test',
      email: 'test1@email.com',
      password: '123',
      passwordConfirmation: '1234',
      conditions: true
    });
  }

  registerUser() {

    if (this.form.invalid) {
      return;
    }

    if (!this.form.value.conditions) {
      swal("Important", "Must accept conditions", "warning");
      return;
    }

    let user = new User(
      this.form.value.name,
      this.form.value.email,
      this.form.value.password
    );

    this._userService.createUser(user).subscribe(
      res => {
        this.router.navigate(['/login']);
      }
    );


  }

}
