import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_Services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../_Services/alertify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private afAuth: AuthService,
    private router: Router,
    private alertify: AlertifyService
  ) { }

  googleLogin() {
    this.afAuth.googleLogin().then(() => {
      this.router.navigate(['/songs']);
      this.alertify.success('Login efetuado com sucesso!');
    }, error => {
      this.alertify.error('Login Invalido');
    });
  }

  facebookLogin() {
    this.afAuth.facebookLogin().then(data => {
      this.router.navigate(['/songs']);
      this.alertify.success('Login efetuado com sucesso!');
    }, error => {
      this.alertify.error('Login Invalido');
    });
  }

}
