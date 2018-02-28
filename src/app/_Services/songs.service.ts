import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Song } from '../_Models/Song';
import { AlertifyService } from './alertify.service';
import * as firebase from 'firebase';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class SongsService {

    songsRef: AngularFireList<Song>;
    songs: Observable<Song[]>;

    constructor(
        private alertify: AlertifyService,
        private db: AngularFireDatabase
    ) { }

    getSongs() {
        this.songsRef = this.db.list<Song>('songs');
        this.songs = this.songsRef.snapshotChanges().map(actions => {
            return actions.map((a) => {
                const data = a.payload.val();
                const $key = a.payload.key;
                return { $key, ...data };
            });
        })
        return this.songs;
    }

    addSong(song: Song) {
        this.db.list(`songs/`).push(song);
    }

    removeSong(songKey: string) {
        return this.db.list(`songs`).remove(songKey)
            .then( () => {
                this.alertify.success('Música removida com sucesso!');
            })
            .catch((error) => {
                this.alertify.error(error)
            });
    }

}
