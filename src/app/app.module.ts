import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';


import { AppComponent } from './app.component';
import { SongsComponent } from './songs/songs.component';
import { SongDetailComponent } from './songs/song-detail/song-detail.component';
import { FileDetailComponent } from './songs/song-detail/file-detail/file-detail.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';

import { AlertifyService } from './_Services/alertify.service';
import { UploadService } from './_Services/upload.service';
import { SongsService } from './_Services/songs.service';
import { AuthService } from './_Services/auth.service';
import { UserService } from './_Services/user.service';

import { appRoutes } from './route';
import { AuthGuard } from './_Guards/auth.guard';
import { AdminGuard } from './_Guards/admin.guard';
import { SongsResolver } from './_Resolvers/songs.resolver';


@NgModule({
  declarations: [
    AppComponent,
    SongsComponent,
    SongDetailComponent,
    FileDetailComponent,
    UsersComponent,
    LoginComponent,
    NavbarComponent
],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDj7YBJbNFUDtsDthW2vk8WIJj8tX9gS4M",
      databaseURL: "https://test-project-7549d.firebaseio.com/",
      authDomain: "test-project-7549d.firebaseapp.com",
      storageBucket: "test-project-7549d.appspot.com",
      projectId: "test-project-7549d",
    }),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    SongsService,
    UploadService,
    AlertifyService,
    UserService,
    AuthGuard,
    AdminGuard,
    SongsResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
