import { Component, OnInit } from '@angular/core';
import { UserService } from '../_Services/user.service';
import { User } from '../_Models/User';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../_Services/auth.service';
import { AlertifyService } from '../_Services/alertify.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
  currentUser: User;

  constructor(
    public auth: AuthService,
    private userService: UserService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
    this.auth.user$.subscribe(data => {
      this.currentUser = data;
    });
  }

  toggleInvalid(user) {
    if(this.auth.isAdmin(this.currentUser)) {
      this.userService.toggleInvalidRole(user);
    } else {
      this.alertify.error('Acesso negado!');
    }
  }

  toggleStandard(user) {
    if(this.auth.isAdmin(this.currentUser)) {
      this.userService.toggleStandardRole(user);
    } else {
      this.alertify.error('Acesso negado!');
    }
  }

  toggleAdmin(user) {
    if(this.auth.isAdmin(this.currentUser)) {
      this.userService.toggleAdminRole(user);
    } else {
      this.alertify.error('Acesso negado!');
    }
  }

}
