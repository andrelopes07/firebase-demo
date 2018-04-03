import { Component, Input, OnInit, OnChanges, TemplateRef} from '@angular/core';
import { SongsService } from '../../_Services/songs.service';
import { UploadService } from '../../_Services/upload.service';
import { AlertifyService } from '../../_Services/alertify.service';
import { AuthService } from '../../_Services/auth.service';
import { Song } from '../../_Models/Song';
import { User } from '../../_Models/User';
import { Upload } from '../../_Models/Upload';
import { Observable } from 'rxjs/Observable';
import { DecimalPipe } from '@angular/common';
import { VideoService } from '../../_Services/video.service';
import { Video } from '../../_Models/Video';
import { SafePipe } from '../../_Pipes/safe.pipe';
import { FileSizePipe } from '../../_Pipes/fileSize.pipe';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.css']
})
export class SongDetailComponent implements OnInit, OnChanges {
  @Input() song: Song;
  @Input() user: User;
  uploads: Upload[];
  videos: Video[];
  selectedFiles: FileList | null;
  currentUpload: Upload;
  selectedTab: string;
  modalRef: BsModalRef;
  videoToAdd: Video = {
    url: ''
  };

  constructor(
    public auth: AuthService,
    private songsService: SongsService,
    private uploadService: UploadService,
    private videoService: VideoService,
    private alertify: AlertifyService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.uploadService.getUploads(this.song.id).forEach(data => {
      this.uploads = data;
    });
    this.videoService.getVideos(this.song.id).forEach(data => {
      this.videos = data;
    });
    this.selectedTab = 'files';
  }

  ngOnChanges() {
    this.uploadService.getUploads(this.song.id).forEach(data => {
      this.uploads = data;
    });
    this.videoService.getVideos(this.song.id).forEach(data => {
      this.videos = data;
    });
    this.selectedTab = 'files';
    this.currentUpload = null;
    this.selectedFiles = null;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  check() {
    console.log(this.currentUpload);
    console.log(this.selectedFiles);
  }

  detectFiles($event: Event) {
    this.selectedFiles = ($event.target as HTMLInputElement).files;
    console.log($event);
  }

  uploadSingle() {
    if(this.auth.canEdit(this.user)) {
      let file = this.selectedFiles;
      if (file && file.length === 1) {
        this.currentUpload = new Upload(file.item(0));
        this.uploadService.pushUpload(this.currentUpload, this.song.title, this.song.id);
      } else {
        this.alertify.error('Nenhum ficheiro selecionado!');
      }
    } else {
      this.alertify.error("Acesso Negado!");
    }
  }

  removeFile(upload: Upload) {
    if(this.auth.canEdit(this.user)) {
      this.alertify.confirm(`Tem a certeza que deseja remover ${upload.name}?`, () => {
        this.uploadService.deleteUpload(this.song, upload);
        this.alertify.success('Ficheiro removido com sucesso!');
      });
    } else {
      this.alertify.error("Acesso Negado!");
    }
  }

  addVideo() {
    if(this.auth.canEdit(this.user)) {
      this.videoService.addVideo(this.videoToAdd, this.song.id);
      this.videoToAdd.url = '';
      this.alertify.success('Vídeo adicionado com sucesso!');
      this.modalRef.hide();
    } else {
      this.alertify.error("Acesso Negado!");
    }
  }

  removeVideo(video: Video) {
    if(this.auth.canEdit(this.user)) {
      this.alertify.confirm(`Tem a certeza que deseja remover este vídeo?`, () => {
        this.videoService.deleteVideo(this.song.id, video.id);
        this.alertify.success('Vídeo removido com sucesso!');
      });
    } else {
      this.alertify.error("Acesso Negado!");
    }
  }

}
