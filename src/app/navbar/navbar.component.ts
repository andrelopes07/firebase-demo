import { Component, OnInit, Input } from '@angular/core';
import { User } from '../_Models/User';
import { AuthService } from '../_Services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../_Services/alertify.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() user: User;
  
  constructor(
    private afAuth: AuthService,
    private router: Router,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {

  }

  logout() {
    this.afAuth.signOut();
    this.router.navigate(['/login']);
    this.alertify.message('Logout efetuado com sucesso');
  }

}
