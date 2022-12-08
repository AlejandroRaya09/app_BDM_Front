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
//MODULOS EXTERNOS
import {NgxPaginationModule} from 'ngx-pagination';
import { AutorizarComponent } from './autorizar/autorizar.component';
import { ConsultasVendedorComponent } from './consultas-vendedor/consultas-vendedor.component';
import { AlifeFileToBase64Module } from 'alife-file-to-base64';
import { CarritoComponent } from './carrito/carrito.component';
import { NgxToastNotifierModule } from 'ngx-toast-notifier';
import { ResumenCompraComponent } from './resumen-compra/resumen-compra.component';
import { ComprasComponent } from './compras/compras.component';
import { CotizacionesComponent } from './cotizaciones/cotizaciones.component';
import { CotizacionesOfertaComponent } from './cotizaciones-oferta/cotizaciones-oferta.component';
import { CotizacionesCompradorComponent } from './cotizaciones-comprador/cotizaciones-comprador.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    CategoriasComponent,
    ProductosComponent,
    ListasComponent,
    PerfilComponent,
    MetodosPagoComponent,
    VerProductoComponent,
    AutorizarComponent,
    ConsultasVendedorComponent,
    CarritoComponent,
    ResumenCompraComponent,
    ComprasComponent,
    CotizacionesComponent,
    CotizacionesOfertaComponent,
    CotizacionesCompradorComponent,
  ],
  exports:[
    DashboardComponent,
    PagesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgxPaginationModule,
    AlifeFileToBase64Module,
    NgxToastNotifierModule.forRoot({
      timeOut:5000
    })
  ]
})
export class PagesModule { }
