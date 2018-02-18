import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { AlertifyService } from './_services/alertify.service';
import { UploadService } from './_services/upload.service';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { SongsComponent } from './songs/songs.component';
import { SongDetailComponent } from './songs/song-detail/song-detail.component';
import { SongsService } from './_services/songs.service';
import { FileUploadComponent } from './songs/song-detail/file-upload/file-upload.component';


@NgModule({
  declarations: [
    AppComponent,
    SongsComponent,
    SongDetailComponent,
    FileUploadComponent
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
    AngularFireStorageModule,
    FormsModule
  ],
  providers: [
    SongsService,
    UploadService,
    AlertifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
