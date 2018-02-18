import { Component, OnInit } from '@angular/core';
import { Upload } from '../_Models/Upload';
import { AlertifyService } from '../_services/alertify.service';
import { Observable } from 'rxjs/Observable';
import { SongsService } from '../_services/songs.service';
import { Song } from '../_Models/Song';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {
  songs: Observable<Song[]>;

  song: Song = {
    title: ''
  };

  constructor(
    private songsService: SongsService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.songs = this.songsService.getSongs();
  }

  addSong(song: Song) {
    this.songsService.addSong(song);
  }

}
