import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Song } from '../_Models/Song';
import { AlertifyService } from './alertify.service';
import * as firebase from 'firebase';

@Injectable()
export class SongsService {
    basePath = 'songs';
    songsRef: AngularFireList<Song>;
    songs: Observable<Song[]>;

    constructor(private db: AngularFireDatabase, private alertify: AlertifyService) { }

    getSongs() {
        this.songs = this.db.list(`${this.basePath}/`).snapshotChanges().map((actions) => {
            return actions.map((a) => {
                const data = a.payload.val();
                const $key = a.payload.key;
                return { $key, ...data };
            });
        });
        return this.songs;
    }

    addSong(song: Song) {
        this.db.list(`${this.basePath}/`).push(song);
    }

    removeSong(song: Song) {
        this.deleteSongData(song.$key)
            .then( () => {
                this.alertify.success('Música removida com sucesso!');
            })
            .catch((error) => {
                this.alertify.error(error)
            });
    }

    //  FOLDER REMOVAL NOT YET IMPLEMENTED ON FIREBASE
    /*  private deleteSongStorage(songName: string) {
        const storageRef = firebase.storage().ref().child(`${this.basePath}/${songName}`).root;
        storageRef.delete();
        this.alertify.success('Música removida com sucesso!');
    } */

    private deleteSongData(songKey: string) {
        return this.db.list(`${this.basePath}/`).remove(songKey);
    }

}