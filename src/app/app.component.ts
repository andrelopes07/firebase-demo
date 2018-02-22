import { Component } from '@angular/core';
import { AlertifyService } from './_Services/alertify.service';
import { AuthService } from './_Services/auth.service';

@Component({
  selector: 'app-root',
  template: `
    
  <div class="container">
    <div *ngIf="afAuth.user$ | async as user; then authenticated else guest">

    </div>

    <!-- USER NOT LOGGED IN -->
    <ng-template #guest>
      <h3>Por favor, efetue o login</h3>
      <button (click)="afAuth.googleLogin()" class="btn btn-primary">Login with Google</button>
    </ng-template>

    <!-- USER LOGGED IN -->
    <ng-template #authenticated>
      <div *ngIf="afAuth.user$ | async as user">
        <h3>Olá, {{ user.email }}</h3>
        <button (click)="afAuth.signOut()" class="btn btn-danger">Logout</button>
      </div>
      
      <div *ngIf="afAuth.user$ | async as user">
        <app-songs [user]="user"></app-songs>
      </div>

    </ng-template>
  </div>

  `,
  styles: []
})
export class AppComponent {

  constructor(
    public afAuth: AuthService,
    private alertify: AlertifyService
  ) { }

}
