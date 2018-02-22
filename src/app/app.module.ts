import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { AlertifyService } from './_Services/alertify.service';
import { UploadService } from './_Services/upload.service';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { SongsComponent } from './songs/songs.component';
import { SongDetailComponent } from './songs/song-detail/song-detail.component';
import { SongsService } from './_Services/songs.service';
import { FileDetailComponent } from './songs/song-detail/file-detail/file-detail.component';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AuthService } from './_Services/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    SongsComponent,
    SongDetailComponent,
    FileDetailComponent
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
    FormsModule
  ],
  providers: [
    AuthService,
    SongsService,
    UploadService,
    AlertifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
