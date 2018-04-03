import { Component, OnInit, Input } from '@angular/core';
import { AlertifyService } from '../_Services/alertify.service';
import { SongsService } from '../_Services/songs.service';
import { AuthService } from '../_Services/auth.service';
import { Song } from '../_Models/Song';
import { User } from '../_Models/User';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {
  user: User;
  songs: Observable<Song[]>;
  songToAdd: Song = {
    title: ''
  };
  selectedSong: Song;

  constructor(
    public auth: AuthService,
    private songsService: SongsService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.songs = this.songsService.getSongs();
    this.auth.user$.subscribe(data => {
      this.user = data;
  })}

  addSong(song: Song) {
    if(this.auth.canEdit(this.user)) {
      this.songsService.addSong(song);
      this.songToAdd.title = '';
    } else {
      this.alertify.error('Acesso negado!');
    }
  }

  removeSong(song: Song) {
      this.alertify.confirm(`Tem a certeza que deseja remover ${song.title}?`, () => {
      this.songsService.removeSong(song.id).then(() => {
        this.selectedSong = null;
        this.alertify.success('Música removida com sucesso!');
      });
    });
  }

  selectSong(song) {
    this.selectedSong = song;
  }

}
