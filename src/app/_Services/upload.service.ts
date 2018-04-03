import { Injectable } from '@angular/core';
import { Upload } from '../_Models/Upload';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { AlertifyService } from './alertify.service';
import { Song } from '../_Models/Song';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable()
export class UploadService {

    private uploadsRef: AngularFirestoreCollection<Upload>;
    upload$: Observable<Upload[]>;

    constructor(
        private db: AngularFirestore,
        private alertify: AlertifyService
    ) { }

    getUploads(id: string) {
        this.uploadsRef = this.db.collection<Upload>(`songs/${id}/Files/`, ref => ref.orderBy('name'));
        this.upload$ = this.uploadsRef.snapshotChanges().map((actions) => {
            return actions.map((a) => {
                const data = a.payload.doc.data() as Upload;
                const id = a.payload.doc.id;
                return { id, ...data };
            });
        });
        return this.upload$;
    }

    pushUpload(upload: Upload, songTitle: string, id: string) {
        const storageRef = firebase.storage().ref();
        const uploadTask = storageRef.child(`songs/${songTitle}/${upload.file.name}`).put(upload.file);

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot: firebase.storage.UploadTaskSnapshot) =>  {
                // Upload in progress
                const snap = snapshot;
                upload.progress = (snap.bytesTransferred / snap.totalBytes) * 100
            },
            (error) => {
                // Upload failed
                this.alertify.error(error.message);
            },
            () => {
                // Upload success
                if (uploadTask.snapshot.downloadURL) {
                    upload.url = uploadTask.snapshot.downloadURL;
                    upload.name = upload.file.name;
                    upload.size = upload.file.size;
                    upload.createdAt = Date.now();
                    this.saveFileData(upload, id);
                    this.alertify.success('Ficheiro adicionado com sucesso!');
                } else {
                    this.alertify.error('ERRO: Sem conteúdo!');
                }
            },
        );
    }

    deleteUpload(song: Song, upload: Upload) {
        this.deleteFileData(song.id, upload.id)
            .then( () => {
                this.deleteFileStorage(song.title, upload.name);
            })
            .catch((error) => this.alertify.error(error));
    }

    private deleteFileStorage(songName: string, fileName: string) {
        const storageRef = firebase.storage().ref();
        storageRef.child(`songs/${songName}/${fileName}`).delete()
    }

    private saveFileData(upload: Upload, id: string) {
        let data = {
            name: upload.name,
            url: upload.url,
            size: upload.size,
            createdAt: upload.createdAt
        }
        return this.db.collection(`songs/${id}/Files`).add(data);
    }

    private deleteFileData(songId: string, uploadId: string) {
        return this.db.collection(`songs/${songId}/Files`).doc(uploadId).delete();
    }

}
