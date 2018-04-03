import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Video } from '../_Models/Video';
import { Observable } from 'rxjs/Observable';
import { AlertifyService } from './alertify.service';

@Injectable()
export class VideoService {

    private videosRef: AngularFirestoreCollection<Video>;
    videos$: Observable<Video[]>;

    constructor(
        private db: AngularFirestore,
        private alertify: AlertifyService
    ) { }

    getVideos(id: string) {
        this.videosRef = this.db.collection<Video>(`songs/${id}/Videos/`);
        this.videos$ = this.videosRef.snapshotChanges().map((actions) => {
            return actions.map((a) => {
                const data = a.payload.doc.data() as Video;
                const id = a.payload.doc.id;
                return { id, ...data };
            });
        });
        return this.videos$;
    }

    addVideo(video: Video, id: string) {
        let data = {
            url: 'https://www.youtube.com/embed/' + video.url,
        }
        return this.db.collection(`songs/${id}/Videos`).add(data);
    }

    deleteVideo(songId: string, videoId: string) {
        return this.db.collection(`songs/${songId}/Videos`).doc(videoId).delete();
    }

}
