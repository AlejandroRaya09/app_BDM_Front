import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    SidebarComponent, 
    HeaderComponent
  ],
  exports: [
    SidebarComponent, 
    HeaderComponent
  ],
  imports: [CommonModule],
})
export class SharedModule {}
