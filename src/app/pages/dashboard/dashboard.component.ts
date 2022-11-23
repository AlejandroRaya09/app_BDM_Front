import { Component, OnInit } from '@angular/core';
import { NgxToastService } from 'ngx-toast-notifier';
import { ProductoModel } from 'src/app/Models/ProductoModel';
import { ProductoService } from 'src/app/Services/producto.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  productosMasVendidos:any;
  listPorductos:any;
  paginaActual=1;
  constructor(
    private notificaciones: NgxToastService,
    private productoService: ProductoService
  ) { }

  ngOnInit(): void {
   this.listarProductosMasVendidos()
   this.listarTodosLosProductos()
  }


  listarProductosMasVendidos(){
    const producto: ProductoModel = {};
    this.productoService.listarProductosFav(producto).subscribe((data) => {
      this.productosMasVendidos = data;
    });
  }

  listarTodosLosProductos(){
    const producto: ProductoModel = {};
    this.productoService.listarProductosTODOS(producto).subscribe((data) => {
      this.listPorductos = data;
    });
  }

  agregarCarrito(id:number){

  }

  listarWishList(){

  }

  agregarWishList(id:number){

  }




}
