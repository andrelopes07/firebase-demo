import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../_Services/auth.service';
import { AlertifyService } from '../_Services/alertify.service';
import { User } from '../_Models/User';

@Injectable()
export class AdminGuard implements CanActivate {
    user: User;
    
    constructor(
        private auth: AuthService,
        private router: Router,
        private alertify: AlertifyService
    ) {}

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        this.auth.user$.subscribe(data => {
            this.user = data;
        });
        if (this.auth.canDelete(this.user)) { 
            return true;
        }
        this.router.navigate(['/songs']);
        this.alertify.error('Acesso Negado');
        return false;    
    }
}
