import { Component, OnInit, Input } from '@angular/core';
import { Upload } from '../_Models/Upload';
import { AlertifyService } from '../_Services/alertify.service';
import { Observable } from 'rxjs/Observable';
import { SongsService } from '../_Services/songs.service';
import { Song } from '../_Models/Song';
import { AuthService } from '../_Services/auth.service';
import { User } from '../_Models/User';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {
  @Input() user: User;
  songs: Observable<Song[]>;
  song: Song = {
    title: ''
  };

  constructor(
    private auth: AuthService,
    private songsService: SongsService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.songs = this.songsService.getSongs();
  }

  addSong(song: Song) {
    if(this.auth.canEdit(this.user)) {
      this.songsService.addSong(song);
      this.alertify.success('Musica adicionada com sucesso!');
    } else {
      this.alertify.error('Acesso negado!');
    }
  }

}
