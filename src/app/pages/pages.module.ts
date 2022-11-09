import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//COMPONENTES PROPIOS
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
//MODULOS PROPIOS
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../DesignModule/material.module';
import { CategoriasComponent } from './categorias/categorias.component';
import { ProductosComponent } from './productos/productos.component';
import { ListasComponent } from './listas/listas.component';
import { PerfilComponent } from './perfil/perfil.component';
import { MetodosPagoComponent } from './metodos-pago/metodos-pago.component';
import { VerProductoComponent } from './ver-producto/ver-producto.component';


@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    CategoriasComponent,
    ProductosComponent,
    ListasComponent,
    PerfilComponent,
    MetodosPagoComponent,
    VerProductoComponent
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
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ]
})
export class PagesModule { }
