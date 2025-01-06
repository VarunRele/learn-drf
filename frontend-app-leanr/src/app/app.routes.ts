import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FrontPageComponent } from './components/front-page/front-page.component';
import { DetailViewComponent } from './components/detail-view/detail-view.component';
import { CreateViewComponent } from './components/create-view/create-view.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', loadComponent: () => import('./components/signup/signup.component').then(m => m.SignupComponent) },
    {path: 'log', component: FrontPageComponent},
    {path: 'log/:id', component:DetailViewComponent},
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'not-found', component:NotFoundComponent},
    {path: 'create', component:CreateViewComponent},
    {path: '**', redirectTo: '/not-found'}
];
