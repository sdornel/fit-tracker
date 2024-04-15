import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

export const routes: Routes = [
    { path: 'user', component: UserProfileComponent }, // this needs to map to an individual user
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
