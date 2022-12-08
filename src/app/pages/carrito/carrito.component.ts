import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarritoService } from '../../Services/carrito.service';
import { CarritoModel, CarritoDetalleModel } from '../../Models/CarritoModel';
import { NgxToastService } from 'ngx-toast-notifier';
import { Router } from '@angular/router';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  constructor(public dialogref: MatDialogRef<CarritoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private carritoService:CarritoService,
    private notificacion: NgxToastService,) { }

  ngOnInit(): void {
    this.verProductosCarrito()
  }
  
  carritoGeneral:any;
  carritoProductos:any;

  verProductosCarrito(){
    const carritoModel:CarritoModel = {
      Id_Usuario: Number(sessionStorage.getItem('id_user'))
    }
    this.carritoService.listarCarrito(carritoModel).subscribe(data=>{
      this.carritoGeneral = data;
      console.log(this.carritoGeneral)

      const carritoModel:CarritoModel = {
        Id_Carrito: Number(sessionStorage.getItem('Id_Carrito'))
      }
      this.carritoService.listarCarritoCompleto(carritoModel).subscribe(data=>{
        this.carritoProductos = data;
        console.log(this.carritoProductos)
      })
    })
  }

  borrarProducto(producto:any){
    const prodEliminar: CarritoDetalleModel = {
      Id_CarritoDetalle: producto.Id_CarritoDetalle,
      Cantidad: producto.Cantidad,
      PrecioTotal: producto.PrecioTotal,
      Id_Usuario: Number(sessionStorage.getItem('id_user'))
    }
    this.carritoService.EliminarProducto(prodEliminar).subscribe(data=>{
      if(data[0].msg){
        this.verProductosCarrito();
        this.notificacion.onSuccess('Borrado exitoso','')
      }
    })
  }

  agregarProducto(producto:any){
    if(producto.Existencia > producto.Cantidad){
    const prodAgregar: CarritoDetalleModel = {
      Id_CarritoDetalle: producto.Id_CarritoDetalle,
      Precio: producto.Precio,
      Id_Usuario: Number(sessionStorage.getItem('id_user'))
    }
    this.carritoService.agregarExitenciaProducto(prodAgregar).subscribe(data=>{
      if(data[0].msg){
        this.verProductosCarrito();
        this.notificacion.onSuccess('Se agregego correctamente','')
      }
    })}
    if(producto.Existencia == producto.Cantidad){
      this.notificacion.onDanger('Revasa las existencias disponibles','')
    }
  }

  borrarExistencia(producto:any){
    if(producto.Cantidad > 0){
    const prodAgregar: CarritoDetalleModel = {
      Id_CarritoDetalle: producto.Id_CarritoDetalle,
      Precio: producto.Precio,
      Id_Usuario: Number(sessionStorage.getItem('id_user'))
    }
    this.carritoService.quitarExitenciaProducto(prodAgregar).subscribe(data=>{
      if(data[0].msg){
        this.verProductosCarrito();
        this.notificacion.onSuccess('Se elimino correctamente','')
      }
    })
  }
  if(producto.Cantidad == 0){
    this.borrarProducto(producto)
  }
  }



  cerrar(){
    this.dialogref.close();
  }

}
