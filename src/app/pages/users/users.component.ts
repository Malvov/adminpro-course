import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService, SearchService, ModalService } from '../../services/service.index';


declare var swal: any;

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
    public _userService: UserService,
    public _searchService: SearchService,
    public _modalService: ModalService
  ) { }

  ngOnInit() {
    this.getUsers();
    this._modalService.notification.subscribe(res => this.getUsers());
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

  searchUsers(term: string) {
    if (term.length <= 0) {
      this.getUsers();
      return;
    }

    this.loading = true;

    this._searchService.searchUsers(term).subscribe( (users: User[]) => {
      this.users = users;
      this.loading = false;
    });
  }

  deleteUser(user: User) {
    if (user._id === this._userService.user._id) {
      swal('Can\'t delete user', 'You can\'t delete yourself', 'error');
      return;
    }

    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover ' + user.name,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this._userService.deleteUser(user._id).subscribe( res => {
          console.log(res);
          this.getUsers();
        });
      }
    });
  }

  saveUser(user: User) {
    this._userService.updateUser(user).subscribe();
  }

  showModal(id: string) {
    this._modalService.showModal('users', id, 'upload');
  }
}
