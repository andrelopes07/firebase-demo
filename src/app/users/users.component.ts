import { Component, OnInit } from '@angular/core';
import { UserService } from '../_Services/user.service';
import { User } from '../_Models/User';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: Observable<User[]>;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.users = this.userService.getUsers();
  }

  toggleAdmin(user) {
    this.userService.toggleAdminRole(user);
  }

}
