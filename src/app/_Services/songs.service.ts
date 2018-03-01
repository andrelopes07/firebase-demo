import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Song } from '../_Models/Song';
import { AlertifyService } from './alertify.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable()
export class SongsService {

    private songsRef: AngularFirestoreCollection<Song>;
    songs$: Observable<Song[]>;

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
        this.db.collection(`songs/`).add(song);
    }

    removeSong(id: string) {
        return this.db.collection(`songs`).doc(id).delete()
            .then( () => {
                this.alertify.success('Música removida com sucesso!');
            })
            .catch((error) => {
                this.alertify.error(error)
            });
    }

}
