import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ProductosComponent } from './productos/productos.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        children:
            [
                { path: '', component: DashboardComponent },
                { path: 'categorias', component: CategoriasComponent},
                { path: 'productos', component: ProductosComponent},
            ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }