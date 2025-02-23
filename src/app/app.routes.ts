import { Routes } from '@angular/router';
import { ConnectPageComponent } from './connect-page/connect-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';


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
      path: 'dashboard',
      component: DashboardComponent
        
    },
    {
        path: 'login',
        component:LoginComponent,
    },
      // Wildcard route for undefined paths
    {
        path: '**',
        component: HomePageComponent,
    },

];
