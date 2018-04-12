import { Component, Input } from '@angular/core';
import { User } from '../_Models/User';
import { AuthService } from '../_Services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../_Services/alertify.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() user: User;
  
  constructor(
    public auth: AuthService,
    private router: Router,
    private alertify: AlertifyService
  ) { }

  logout() {
    this.auth.signOut();
    this.router.navigate(['/login']);
  }

}
