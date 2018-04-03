import { Component } from '@angular/core';
import { AuthService } from './_Services/auth.service';

@Component({
  selector: 'app-root',
  template: `
    
  <div *ngIf="auth.user$ | async as user">
    <app-navbar [user]="user"></app-navbar>
  </div>

  <div class="container-fluid" style="margin-top: 70px">
    <router-outlet></router-outlet>
  </div>
  
  `,
  styleUrls: []
})
export class AppComponent {

  constructor(
    public auth: AuthService
  ) { }

}
