import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarComponent } from './sidebar/sidebar.component';
import { MaterialModule } from '../DesignModule/material.module';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    SidebarComponent, 
  ],
  exports: [
    SidebarComponent, 
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
],
})
export class SharedModule {}
