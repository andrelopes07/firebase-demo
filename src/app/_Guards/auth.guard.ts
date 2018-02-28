import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../_Services/auth.service';
import { AlertifyService } from '../_Services/alertify.service';

@Injectable()
export class AuthGuard implements CanActivate {
    
    constructor(
        private auth: AuthService,
        private router: Router,
        private alertify: AlertifyService
    ) {}

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        if (this.auth.loggedIn()) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;    
    }
}
