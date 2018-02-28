import { Routes } from '@angular/router';
import { SongsComponent } from './songs/songs.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_Guards/auth.guard';
import { SongsResolver } from './_Resolvers/songs.resolver';
import { AdminGuard } from './_Guards/admin.guard';

export const appRoutes: Routes = [
    { path: '', redirectTo: 'songs', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: '',
      runGuardsAndResolvers: 'always',
      canActivate: [AuthGuard],
      children: [
        { path: 'songs', component: SongsComponent },
        { path: 'users', component: UsersComponent },
      ]
    },
    { path: '**', redirectTo: 'songs', pathMatch: 'full'}
];