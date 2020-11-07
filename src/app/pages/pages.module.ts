import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';
import { SaredModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
  ],
  imports: [
    SaredModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    DashboardComponent,
  ]
})
export class PageModule {}