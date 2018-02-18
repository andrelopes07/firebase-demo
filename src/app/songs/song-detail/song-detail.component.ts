import { Component, Input, OnInit } from '@angular/core';
import { Song } from '../../_Models/Song';
import { SongsService } from '../../_services/songs.service';
import { UploadService } from '../../_services/upload.service';
import { Observable } from 'rxjs/Observable';
import { Upload } from '../../_Models/Upload';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.css']
})
export class SongDetailComponent implements OnInit {
  @Input() song: Song;
  uploads: Observable<Upload[]>;

  constructor(
    private songsService: SongsService,
    private uploadService: UploadService
  ) { }

  ngOnInit() {
    this.uploads = this.uploadService.getUploads(this.song.$key);
  }

  removeSong() {
    this.songsService.removeSong(this.song.$key);
  }

}
