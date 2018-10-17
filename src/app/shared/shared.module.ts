import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

import {BreadcrumbsComponent} from './breadcrumbs/breadcrumbs.component';
import {HeaderComponent} from './header/header.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

// Pipes module
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    PipesModule
  ],
  declarations: [
    BreadcrumbsComponent,
    HeaderComponent,
    SidebarComponent,
    PageNotFoundComponent
  ],
  exports: [
    BreadcrumbsComponent,
    HeaderComponent,
    SidebarComponent,
    PageNotFoundComponent
  ]
})
export class SharedModule { }
