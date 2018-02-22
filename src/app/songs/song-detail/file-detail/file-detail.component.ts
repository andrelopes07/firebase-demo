import { Component, OnInit, Input } from '@angular/core';
import { UploadService } from '../../../_Services/upload.service';
import { Upload } from '../../../_Models/Upload';
import { Song } from '../../../_Models/Song';
import { AuthService } from '../../../_Services/auth.service';
import { User } from '../../../_Models/User';
import { AlertifyService } from '../../../_Services/alertify.service';

@Component({
  selector: 'app-file-detail',
  templateUrl: './file-detail.component.html',
  styleUrls: ['./file-detail.component.css']
})
export class FileDetailComponent {
  @Input() user: User;
  @Input() song: Song;
  @Input() upload: Upload;

  constructor(
    private auth: AuthService,
    private uploadService: UploadService,
    private alertify: AlertifyService
  ) { }

  removeFile() {
    if(this.auth.canEdit(this.user)) {
      this.uploadService.deleteUpload(this.song, this.upload);
    } else {
      this.alertify.error("Acesso Negado!");
    }
  }

}
