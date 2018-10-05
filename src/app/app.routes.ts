import { RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {LoginComponent} from './login/login.component';
import {ProgressComponent} from './pages/progress/progress.component';
import {Graph1Component} from './pages/graph1/graph1.component';
import {NoPageFoundComponent} from './shared/no-page-found/no-page-found.component';

const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: LoginComponent },
  { path: 'progress', component: ProgressComponent },
  { path: 'graph1', component: Graph1Component },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: NoPageFoundComponent },
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, {
 useHash: true
});
