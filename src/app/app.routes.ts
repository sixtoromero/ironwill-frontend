import { Routes, RouterModule, Router } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

const APP_ROUTES: Routes = [  

    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'}
    
  ];

//export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash: true});
export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);