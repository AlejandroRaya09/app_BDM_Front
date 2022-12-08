import { Component, OnInit } from '@angular/core';
import { NgxToastService } from 'ngx-toast-notifier';
import { CarritoDetalleModel } from 'src/app/Models/CarritoModel';
import { CotizacionModel } from 'src/app/Models/CotizacionModel';
import { CotizacionService } from 'src/app/Services/cotizacion.service';
import { CarritoService } from '../../Services/carrito.service';

@Component({
  selector: 'app-cotizaciones-comprador',
  templateUrl: './cotizaciones-comprador.component.html',
  styleUrls: ['./cotizaciones-comprador.component.css']
})
export class CotizacionesCompradorComponent implements OnInit {

  paginaActual=1;
  listProductos:any;

  constructor(private notificaciones: NgxToastService,
              private cotizacionService: CotizacionService,
              private carritoService: CarritoService) { }

  ngOnInit(): void {
    this.listarCotizacionVendedor();
  }


  listarCotizacionVendedor(){
    const usuario: CotizacionModel = {
      Id_Cliente: Number(sessionStorage.getItem('id_user'))
    }
    this.cotizacionService.listarCotizacionesComprador(usuario).subscribe(data=>{
      this.listProductos=data
    })
  }

  agregarCarrito(prod:any){
    if(prod.Estado == 'Confirmado'){
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
  })}
  else{
    this.notificaciones.onDanger('Para agregar al carrito debe de estar acpetado','')
  }
    }
    
}
