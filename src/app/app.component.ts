import { Component } from '@angular/core';
import { UploadService } from './_services/upload.service';
import { Upload } from './_Models/Upload';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertifyService } from './_services/alertify.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  template: `
    <div *ngIf="afAuth.authState | async as user; else showLogin">
      <h1>Bem-vindo {{ user.email }}!</h1>
      <button (click)="logout()">Logout</button>
    </div>

    <ng-template #showLogin>
        <p>Por favor faça Login</p>
        <button (click)="login()">Login com o Google</button>
    </ng-template>

    <div class="container">
        <app-songs></app-songs>
    </div>
  `,
  styles: []
})
export class AppComponent {

  constructor(
    public afAuth: AngularFireAuth,
    private alertify: AlertifyService
  ) { }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.alertify.success('Login efetuado com sucesso!');
  }

  logout() {
    this.afAuth.auth.signOut();
    this.alertify.success('Logout efetuado com sucesso!');
  }

}
