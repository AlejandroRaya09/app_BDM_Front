import { Component, OnInit } from '@angular/core';
import { NgxToastService } from 'ngx-toast-notifier';
import { ListaDetalleModel, ListaModel } from 'src/app/Models/ListaModel';
import { ProductoModel } from 'src/app/Models/ProductoModel';
import { ProductoService } from 'src/app/Services/producto.service';
import { ListaService } from '../../Services/lista.service';
import { CarritoModel, CarritoDetalleModel } from '../../Models/CarritoModel';
import { CarritoService } from '../../Services/carrito.service';
import { FormArray, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CotizacionesOfertaComponent } from '../cotizaciones-oferta/cotizaciones-oferta.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  productosMasVendidos:any;
  listPorductos:any;
  paginaActual=1;
  busqueda!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notificaciones: NgxToastService,
    private productoService: ProductoService,
    private listaService:ListaService,
    private carritoService: CarritoService,
    private dialog: MatDialog
  ) { 
    this.busqueda = this.fb.group({
      Texto: ['', Validators.required]
    });
  }

  ngOnInit(): void {
   this.listarProductosMasVendidos();
   this.listarTodosLosProductos();
   this.listaActual();
   this.listarCarrito();
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

  agregarCarrito(prod:any){
    console.log(prod)
    const ProductoCarrito: CarritoDetalleModel = {
      Id_Carrito: Number(sessionStorage.getItem('Id_Carrito')),
      Id_Producto:prod.Id_Producto,
      Cantidad: 1,
      Precio: prod.Precio,
      PrecioTotal: prod.Precio
    }
this.carritoService.agregarProductoCarrito(ProductoCarrito).subscribe(data=>{
  if(data[0].msg){
    this.notificaciones.onSuccess('Agregado Correctamente al carrito de compras','')
  }
})
  }

  agregarWishList(id:number){
    const DetalleLista: ListaDetalleModel = {Id_Lista:Number(sessionStorage.getItem('ListaActivaID')), Id_Producto:id};
this.listaService.agregarDetalleLista(DetalleLista).subscribe(data=>{
  if(data[0].id){
    this.notificaciones.onSuccess('Agregado Correctamente a WishList Activa','')
  }
})
  }

  
listaActual(){
    const Lista: ListaModel = {Id_Usuario: Number(sessionStorage.getItem('id_user'))};
    this.listaService.listarListaACTIVA(Lista).subscribe(data=>{
      sessionStorage.setItem('ListaActivaID',String( data[0].Id_Lista))
    })
  }

  listarCarrito(){
    const Carrito: CarritoModel = {Id_Usuario: Number(sessionStorage.getItem('id_user'))};
    this.carritoService.listarCarrito(Carrito).subscribe(data => {
      sessionStorage.setItem('Id_Carrito',String( data[0].Id_Carrito))
    })
  }

  buscar(){
    const texto: ProductoModel = {
      NombreProducto: this.busqueda.value.Texto
    } 
    this.productoService.listarBuscar(texto).subscribe(data =>{
      this.listPorductos = data
    })
    }

    ofertar(prod:any){
      this.dialog.open(CotizacionesOfertaComponent, {
        width: '800px',
        height: '500px',
        data: prod
      });
    }

}
