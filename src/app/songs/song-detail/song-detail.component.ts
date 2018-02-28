import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Song } from '../../_Models/Song';
import { SongsService } from '../../_Services/songs.service';
import { UploadService } from '../../_Services/upload.service';
import { Observable } from 'rxjs/Observable';
import { Upload } from '../../_Models/Upload';
import { AlertifyService } from '../../_Services/alertify.service';
import { AuthService } from '../../_Services/auth.service';
import { User } from '../../_Models/User';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.css']
})
export class SongDetailComponent implements OnInit, OnChanges {
  @Input() song: Song;
  @Input() user: User;
  uploads: Observable<Upload[]>;
  selectedFiles: FileList | null;
  currentUpload: Upload;

  constructor(
    private auth: AuthService,
    private songsService: SongsService,
    private uploadService: UploadService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.uploads = this.uploadService.getUploads(this.song.$key);
  }

  ngOnChanges() {
    this.uploads = this.uploadService.getUploads(this.song.$key);
  }

  removeSong() {
    if(this.auth.canDelete(this.user)) {
      this.songsService.removeSong(this.song.$key);
      this.alertify.success("Música removida com sucesso!");
    } else {
      this.alertify.error("Acesso Negado!");
    }
  }

  detectFiles($event: Event) {
    this.selectedFiles = ($event.target as HTMLInputElement).files;
  }

  uploadSingle() {
    if(this.auth.canEdit(this.user)) {
      let file = this.selectedFiles;
      if (file && file.length === 1) {
        this.currentUpload = new Upload(file.item(0));
        this.uploadService.pushUpload(this.currentUpload, this.song.title, this.song.$key);
      } else {
        this.alertify.error('Nenhum ficheiro selecionado!');
      }
    } else {
      this.alertify.error("Acesso Negado!");
    }
  }

  removeFile(upload) {
    if(this.auth.canEdit(this.user)) {
      this.uploadService.deleteUpload(this.song, upload);
    } else {
      this.alertify.error("Acesso Negado!");
    }
  }

}
