import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ProductosComponent } from './productos/productos.component';
import { ListasComponent } from './listas/listas.component';
import { MetodosPagoComponent } from './metodos-pago/metodos-pago.component';
import { PerfilComponent } from './perfil/perfil.component';
import { VerProductoComponent } from './ver-producto/ver-producto.component';
import { AutorizarComponent } from './autorizar/autorizar.component';
import { ConsultasVendedorComponent } from './consultas-vendedor/consultas-vendedor.component';
import { ResumenCompraComponent } from './resumen-compra/resumen-compra.component';
import { ComprasComponent } from './compras/compras.component';
import { CotizacionesComponent } from './cotizaciones/cotizaciones.component';
import { CotizacionesCompradorComponent } from './cotizaciones-comprador/cotizaciones-comprador.component';


const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        children:
            [
                { path: '', component: DashboardComponent },
                { path: 'categorias', component: CategoriasComponent},
                { path: 'productos', component: ProductosComponent},
                { path: 'listas', component: ListasComponent},
                { path: 'metodos-pago', component: MetodosPagoComponent},
                { path: 'perfil', component: PerfilComponent},
                { path: 'autorizar', component: AutorizarComponent},
                { path: 'consultas-vendedor', component: ConsultasVendedorComponent},
                { path: 'compra', component: ResumenCompraComponent},
                { path: 'lista-compras', component: ComprasComponent},
                { path: 'cotizaciones', component: CotizacionesComponent},
                { path: 'cotizacion-comprador', component: CotizacionesCompradorComponent},

                {path: 'ver-producto', component: VerProductoComponent}
            ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }