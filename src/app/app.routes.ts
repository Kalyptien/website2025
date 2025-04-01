import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    {
        path: '', 
        redirectTo: '/homepage', 
        pathMatch: 'full'},
    {
        path: 'homepage', 
        component: HomepageComponent,
    },
    {
        path: '**', 
        component: PageNotFoundComponent,
    },
];
