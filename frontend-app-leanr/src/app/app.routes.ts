import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', loadChildren: () => import('./components/signup/signup.component').then(m => m.SignupComponent) },
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: '**', component: NotFoundComponent}
];
