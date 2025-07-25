import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProjetComponent } from './projet/projet.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { AProposComponent } from './a-propos/a-propos.component';

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
        path: 'projet', 
        component: ProjetComponent,
    },
    {
        path: 'portfolio', 
        component: PortfolioComponent,
    },
    {
        path: 'a-propos', 
        component: AProposComponent,
    },
    {
        path: '**', 
        component: PageNotFoundComponent,
    },
];
