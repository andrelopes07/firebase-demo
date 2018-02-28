import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { SongsService } from '../_Services/songs.service';
import { AlertifyService } from '../_Services/alertify.service';
import { Song } from '../_Models/Song';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { AuthService } from '../_Services/auth.service';
import { User } from '../_Models/User';

@Injectable()
export class SongsResolver implements Resolve<Song[]> {

    constructor(
        private songsService: SongsService,
        private router: Router,
        private alertify: AlertifyService
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Song[]> {
        return this.songsService.getSongs().catch(error => {
            this.alertify.error('Erro ao retribuir o utilizador');
            return Observable.of(null);
        });
    }
}
