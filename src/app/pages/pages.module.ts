import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
//COMPONENTES PROPIOS
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
//MODULOS PROPIOS
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../DesignModule/material.module';


@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent
  ],
  exports:[
    DashboardComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule
  ]
})
export class PagesModule { }
