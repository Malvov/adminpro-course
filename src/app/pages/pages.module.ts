import {NgModule} from '@angular/core';


// Pages components
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProgressComponent} from './progress/progress.component';
import {Graph1Component} from './graph1/graph1.component';
import {PagesComponent} from './pages.component';

// Shared module
import {SharedModule} from '../shared/shared.module';
import {PAGES_ROUTES} from './pages.routes';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Graph1Component,
    PagesComponent
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Graph1Component,
    PagesComponent
  ],
  imports: [
    SharedModule,
    PAGES_ROUTES
  ]
})
export class PagesModule {

}
