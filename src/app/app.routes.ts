import { Routes } from '@angular/router';
import { ConnectPageComponent } from './connect-page/connect-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';


export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent,
        pathMatch: 'full'
    },
    {
        path: 'connect',
        component:ConnectPageComponent,
     
    },
    {
        path: 'login',
        component:LoginComponent,
     
    }

];
