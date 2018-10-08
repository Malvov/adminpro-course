import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

// Pages components
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProgressComponent} from './progress/progress.component';
import {FirstChartComponent} from './first-chart/first-chart.component';
import {PagesComponent} from './pages.component';

// Shared module
import {SharedModule} from '../shared/shared.module';

// ng2-charts
import {ChartsModule} from 'ng2-charts';


import {PAGES_ROUTES} from './pages.routes';

// Increment component
import {IncrementComponent} from '../components/increment/increment.component';

// DoughnutGraph component
import {DoughnutGraphComponent} from '../components/doughnut-graph/doughnut-graph.component';

// AccountSettings component
import { AccountSettingsComponent } from './account-settings/account-settings.component';






@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    FirstChartComponent,
    PagesComponent,
    IncrementComponent,
    DoughnutGraphComponent,
    AccountSettingsComponent
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
    ChartsModule
  ]
})
export class PagesModule {

}
