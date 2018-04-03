import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Song } from '../_Models/Song';
import { AlertifyService } from './alertify.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class SongsService {

    private songsRef: AngularFirestoreCollection<Song>;
    songs$: Observable<Song[]>;
    songsToCheck: Subscription;

    constructor(
        private alertify: AlertifyService,
        private db: AngularFirestore
    ) { }

    getSongs() {
        this.songsRef = this.db.collection<Song>('songs', ref => ref.orderBy('title'));
        this.songs$ = this.songsRef.snapshotChanges().map(actions => {
            return actions.map((a) => {
                const data = a.payload.doc.data() as Song;
                const id = a.payload.doc.id;
                return { id, ...data };
            });
        })
        return this.songs$;
    }

    addSong(song: Song) {
        const songData = {
            title: song.title
        };
        this.songsRef = this.db.collection<Song>('songs', ref => ref.where('title', '==', song.title));
        this.songsToCheck = this.songsRef.valueChanges().pipe(take(1)).subscribe(data => {
            if(data.length === 0) {
                this.alertify.success('Musica adicionada com sucesso!');
                this.db.collection(`songs/`).add(songData);
            } else {
                this.alertify.error('Musica já existe!');
            }
        });
    }

    removeSong(id: string) {
        return this.db.collection(`songs`).doc(id).delete()
            .catch((error) => {
                this.alertify.error(error)
            });
    }

}
