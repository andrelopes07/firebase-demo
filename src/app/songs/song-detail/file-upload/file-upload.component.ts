import { Component, OnInit, Input } from '@angular/core';
import { Upload } from '../../../_Models/Upload';
import { UploadService } from '../../../_services/upload.service';
import { AlertifyService } from '../../../_services/alertify.service';
import { Song } from '../../../_Models/Song';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  @Input() song: Song;
  selectedFiles: FileList | null;
  currentUpload: Upload;

  constructor(
    private uploadService: UploadService,
    private alertify: AlertifyService
  ) { }

  detectFiles($event: Event) {
    this.selectedFiles = ($event.target as HTMLInputElement).files;
  }

  uploadSingle() {
    const file = this.selectedFiles;
    if (file && file.length === 1) {
      this.currentUpload = new Upload(file.item(0));
      this.uploadService.pushUpload(this.currentUpload, this.song.title, this.song.$key);
    } else {
      this.alertify.error('File not found!');
    }
  }

}
