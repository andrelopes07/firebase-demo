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
  users: Observable<User[]>;
  user: User;

  constructor(
    public auth: AuthService,
    private userService: UserService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.users = this.userService.getUsers();
    this.auth.user$.subscribe(data => {
      this.user = data;
    });
  }

  toggleAdmin(user) {
    if(this.auth.canEdit(this.user)) {
      this.userService.toggleAdminRole(user);
    } else {
      this.alertify.error('Acesso negado!');
    }
  }

  toggleStandard(user) {
    if(this.auth.canEdit(this.user)) {
      this.userService.toggleStandardRole(user);
    } else {
      this.alertify.error('Acesso negado!');
    }
  }

}
