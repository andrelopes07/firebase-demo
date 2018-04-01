import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { AppComponent } from './app.component';
import { SongsComponent } from './songs/songs.component';
import { SongDetailComponent } from './songs/song-detail/song-detail.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';

import { AlertifyService } from './_Services/alertify.service';
import { UploadService } from './_Services/upload.service';
import { SongsService } from './_Services/songs.service';
import { AuthService } from './_Services/auth.service';
import { UserService } from './_Services/user.service';

import { AuthGuard } from './_Guards/auth.guard';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'songs', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'songs', component: SongsComponent },
      { path: 'users', component: UsersComponent },
    ]
  },
  { path: '**', redirectTo: 'songs', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    SongsComponent,
    SongDetailComponent,
    UsersComponent,
    LoginComponent,
    NavbarComponent
],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDj7YBJbNFUDtsDthW2vk8WIJj8tX9gS4M",
      authDomain: "test-project-7549d.firebaseapp.com",
      storageBucket: "test-project-7549d.appspot.com",
      projectId: "test-project-7549d",
    }),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    SongsService,
    UploadService,
    AlertifyService,
    UserService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
