import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { authGuard } from './guards/auth-guard.guard';

export const routes: Routes = [
    { path: 'user', component: UserProfileComponent, canActivate: [authGuard] }, // this needs to map to an individual user
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
