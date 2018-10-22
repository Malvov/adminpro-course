import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

// Pages components
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProgressComponent} from './progress/progress.component';
import {FirstChartComponent} from './first-chart/first-chart.component';
import {PagesComponent} from './pages.component';
import { PromisesComponent } from './promises/promises.component';

// Shared module
import {SharedModule} from '../shared/shared.module';

// Pipes module
import { PipesModule } from '../pipes/pipes.module';

// ng2-charts
import {ChartsModule} from 'ng2-charts';


import {PAGES_ROUTES} from './pages.routes';

// Increment component
import {IncrementComponent} from '../components/increment/increment.component';

// DoughnutGraph component
import {DoughnutGraphComponent} from '../components/doughnut-graph/doughnut-graph.component';

// AccountSettings component
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { UploadModalComponent } from '../components/upload-modal/upload-modal.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { SearchInputComponent } from '../components/search-input/search-input.component';
import { LoadingComponent } from '../components/loading/loading.component';
import { DoctorComponent } from './doctors/doctor.component';
import { SelectModalComponent } from '../components/select-modal/select-modal.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    FirstChartComponent,
    PagesComponent,
    IncrementComponent,
    DoughnutGraphComponent,
    AccountSettingsComponent,
    PromisesComponent,
    RxjsComponent,
    ProfileComponent,
    UsersComponent,
    UploadModalComponent,
    HospitalsComponent,
    DoctorsComponent,
    DoctorComponent,
    SearchInputComponent,
    SelectModalComponent,
    LoadingComponent
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    FirstChartComponent,
    PagesComponent
  ],
  imports: [
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ChartsModule,
    PipesModule,
    CommonModule
  ]
})
export class PagesModule {

}
