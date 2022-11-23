import { Component, OnInit } from '@angular/core';
import { NgxToastService } from 'ngx-toast-notifier';
import { ListaDetalleModel } from 'src/app/Models/ListaModel';
import { ProductoModel } from 'src/app/Models/ProductoModel';
import { ProductoService } from 'src/app/Services/producto.service';
import { ListaService } from '../../Services/lista.service';

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
    private productoService: ProductoService,
    private listaService:ListaService,
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

  agregarWishList(id:number){
    const DetalleLista: ListaDetalleModel = {Id_Lista:Number(sessionStorage.getItem('ListaActivaID')), Id_Producto:id};
this.listaService.agregarDetalleLista(DetalleLista).subscribe(data=>{
  if(data[0].id){
    this.notificaciones.onSuccess('Agregado Correctamente a WishList Activa','')
  }
})
  }




}
