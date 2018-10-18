import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/service.index';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  from: number = 0;
  usersCount: number = 0;
  loading: boolean = true;
  constructor(
    public _userService: UserService
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.loading = true;
    this._userService.getUsers(this.from).subscribe( (res: any) => {
      console.log(res);
      this.usersCount = res.count;
      this.users = res.users;
      this.loading = false;
    });
  }

  paginate(value: number) {
    let page = this.from + value;

    console.log(page);

    if (page >= this.usersCount) {
      return;
    }

    if (page < 0) {
      return;
    }

    this.from += value;
    this.getUsers();
  }

  searchUser(term: string) {

    if (term.length <= 0) {
      this.getUsers();
      return;
    }

    this.loading = true;

    this._userService.searchUser(term).subscribe( (users: User[]) => {
      this.users = users;
      this.loading = false;
    });
  }
}
