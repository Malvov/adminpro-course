import { RouterModule, Routes} from '@angular/router';

import {PagesComponent} from './pages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProgressComponent} from './progress/progress.component';
import {FirstChartComponent} from './first-chart/first-chart.component';
import {AccountSettingsComponent} from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { LoginGuard } from '../services/service.index';
import {RxjsComponent} from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorComponent } from './doctors/doctor.component';


const pagesRoutes: Routes = [
  { path: '', component: PagesComponent,
  canActivate: [LoginGuard],
  children: [
      { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: 'progress', component: ProgressComponent, data: { title: 'Progress' } },
      { path: 'first-chart', component: FirstChartComponent, data: { title: 'Charts' } },
      { path: 'promises', component: PromisesComponent, data: { title: 'Promises' } },
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Account settings' }},
      { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJS' }},

      // Management
      { path: 'profile', component: ProfileComponent, data: { title: 'User profile'} },
      { path: 'hospitals', component: HospitalsComponent, data: { title: 'Hospitals management'} },
      { path: 'doctors', component: DoctorsComponent, data: { title: 'Doctors management'} },
      { path: 'doctors/:id', component: DoctorComponent, data: {title: 'Doctor profile'} },
      { path: 'users', component: UsersComponent, data: { title: 'Users management'} },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ] }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
