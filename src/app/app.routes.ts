import { Routes } from '@angular/router';
import { ConnectPageComponent } from './connect-page/connect-page.component';

export const routes: Routes = [
    {
        path: '',
        component:ConnectPageComponent,
        pathMatch: 'full'
    }
];
