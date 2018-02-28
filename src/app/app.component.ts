import { Component } from '@angular/core';
import { AlertifyService } from './_Services/alertify.service';
import { AuthService } from './_Services/auth.service';

@Component({
  selector: 'app-root',
  template: `
    
  <div *ngIf="afAuth.user$ | async as user">
    <app-navbar [user]="user"></app-navbar>
  </div>

  <div class="container" style="margin-top: 70px">
    <router-outlet></router-outlet>
  </div>
  
  `,
  styleUrls: ['app.component.css']
})
export class AppComponent {

  constructor(
    public afAuth: AuthService
  ) { }

}
