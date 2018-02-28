import { Injectable } from '@angular/core';
import { Upload } from '../_Models/Upload';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { AlertifyService } from './alertify.service';
import { Song } from '../_Models/Song';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class UploadService {

    uploadsRef: AngularFireList<Upload>;
    uploads: Observable<Upload[]>;

    constructor(
        private db: AngularFireDatabase,
        private alertify: AlertifyService
    ) { }

    getUploads(songKey: string) {
        this.uploadsRef = this.db.list<Upload>(`songs/${songKey}/Files/`);
        this.uploads = this.uploadsRef.snapshotChanges().map((actions) => {
            return actions.map((a) => {
                const data = a.payload.val();
                const $key = a.payload.key;
                return { $key, ...data };
            });
        });
        return this.uploads;
    }

    pushUpload(upload: Upload, songTitle: string, songKey: string) {
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
                    upload.createdAt = Date.now();
                    this.saveFileData(upload, songKey);
                    this.alertify.success('Ficheiro adicionado com sucesso!');
                } else {
                    this.alertify.error('ERRO: Sem conteúdo!');
                }
            },
        );
    }

    deleteUpload(song: Song, upload: Upload) {
        this.deleteFileData(song.$key, upload.$key)
            .then( () => {
                this.deleteFileStorage(song.title, upload.name);
                this.alertify.success('Ficheiro removido com sucesso!');
            })
            .catch((error) => this.alertify.error(error));
    }

    private deleteFileStorage(songName: string, fileName: string) {
        const storageRef = firebase.storage().ref();
        storageRef.child(`songs/${songName}/${fileName}`).delete()
    }

    private saveFileData(upload: Upload, songKey: string) {
        let data = {
            name: upload.name,
            url: upload.url,
            createdAt: upload.createdAt
        }
        this.db.list(`songs/${songKey}/Files`).push(data);
    }

    private deleteFileData(songKey: string, uploadKey: string) {
        return this.db.list(`songs/${songKey}/Files`).remove(uploadKey);
    }

}
