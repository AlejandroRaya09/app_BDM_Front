import { Component, OnInit } from '@angular/core';
import { NgxToastService } from 'ngx-toast-notifier';
import { CarritoDetalleModel, CarritoModel } from 'src/app/Models/CarritoModel';
import { DomicilioModel } from 'src/app/Models/DomicilioModel';
import { TarjetaModel } from 'src/app/Models/TarjetaModel';
import { CarritoService } from 'src/app/Services/carrito.service';
import { DomicilioService } from 'src/app/Services/domicilio.service';
import { TarjetaService } from 'src/app/Services/tarjeta.service';
import { OrdenCompraModel } from '../../Models/OrdenCompra';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrdenCompraService } from '../../Services/orden-compra.service';
import { CompraVentaModel } from '../../Models/CompraVentaModel';
import { CompraVentaService } from '../../Services/compra-venta.service';
@Component({
  selector: 'app-resumen-compra',
  templateUrl: './resumen-compra.component.html',
  styleUrls: ['./resumen-compra.component.css'],
})


export class ResumenCompraComponent implements OnInit {

  datosCompra!:FormGroup;

  constructor(
    private fb: FormBuilder,
    private carritoService: CarritoService,
    private notificacion: NgxToastService,
    private domicilioService: DomicilioService,
    private tarjetaService: TarjetaService,
    private ordenService: OrdenCompraService,
    private compraVentaService: CompraVentaService
  ) {

    this.datosCompra = this.fb.group({
      Direccion: [, Validators.required],
      Tarjeta: [, Validators.required],
    });

  }

  ngOnInit(): void {
    this.verProductos();
    this.listarDomicilios();
    this.listarTarjetas();
    this.verCarritoGeneral();
  }

  carritoProductos: any;
  verProductos() {
    const carritoModel: CarritoModel = {
      Id_Carrito: Number(sessionStorage.getItem('Id_Carrito')),
    };
    this.carritoService
      .listarCarritoCompleto(carritoModel)
      .subscribe((data) => {
        this.carritoProductos = data;
      });
  }

  borrarProducto(producto: any) {
    const prodEliminar: CarritoDetalleModel = {
      Id_CarritoDetalle: producto.Id_CarritoDetalle,
      Cantidad: producto.Cantidad,
      PrecioTotal: producto.PrecioTotal,
      Id_Usuario: Number(sessionStorage.getItem('id_user')),
    };
    this.carritoService.EliminarProducto(prodEliminar).subscribe((data) => {
      if (data[0].msg) {
        this.verProductos();
        this.verCarritoGeneral();
        this.notificacion.onSuccess('Borrado exitoso', '');
      }
    });
  }

  agregarProducto(producto: any) {
    if(producto.Existencia > producto.Cantidad){
      const prodAgregar: CarritoDetalleModel = {
        Id_CarritoDetalle: producto.Id_CarritoDetalle,
        Precio: producto.Precio,
        Id_Usuario: Number(sessionStorage.getItem('id_user')),
      };
      this.carritoService
        .agregarExitenciaProducto(prodAgregar)
        .subscribe((data) => {
          if (data[0].msg) {
            this.verProductos();
            this.verCarritoGeneral();
            this.notificacion.onSuccess('Se agregego correctamente', '');
          }
        });
    }
    if(producto.Existencia == producto.Cantidad){
      this.notificacion.onDanger('Revasa las existencias disponibles','')
    }
  
  }

  borrarExistencia(producto: any) {
    if (producto.Cantidad > 0) {
      const prodAgregar: CarritoDetalleModel = {
        Id_CarritoDetalle: producto.Id_CarritoDetalle,
        Precio: producto.Precio,
        Id_Usuario: Number(sessionStorage.getItem('id_user')),
      };
      this.carritoService
        .quitarExitenciaProducto(prodAgregar)
        .subscribe((data) => {
          if (data[0].msg) {
            this.verProductos();
            this.verCarritoGeneral();
            this.notificacion.onSuccess('Se elimino correctamente', '');
          }
        });
    }
    if (producto.Cantidad == 0) {
      this.borrarProducto(producto);
    }
  }

  listaDomicilios: any;
  listarDomicilios() {
    const Domicilio: DomicilioModel = {
      Id_Usuario: Number(sessionStorage.getItem('id_user')),
    };
    this.domicilioService.listarDomicilios(Domicilio).subscribe((data) => {
      this.listaDomicilios = data;
    });
  }

  listaTarjetas: any;
  listarTarjetas() {
    const Tarjeta: TarjetaModel = {
      Id_Usuario: Number(sessionStorage.getItem('id_user')),
    };
    this.tarjetaService.listarTarjetas(Tarjeta).subscribe((data) => {
      this.listaTarjetas = data;
    });
  }

  carritoGeneral:any;
  verCarritoGeneral(){
    const carritoModel:CarritoModel = {
      Id_Usuario: Number(sessionStorage.getItem('id_user'))
    }
    this.carritoService.listarCarrito(carritoModel).subscribe(data=>{
      this.carritoGeneral = data;
  })
}
idCompra:number=0;
comprar(){

  const ordenCompra: OrdenCompraModel = {
    Cant_Prod:this.carritoGeneral[0].Cant_Produc,
    PrecioFinal:this.carritoGeneral[0].PrecioTotal,
    Id_Us_Cliente: Number(sessionStorage.getItem('id_user')),
    Id_Domicilio:this.datosCompra.value.Direccion,
    Id_Pago:this.datosCompra.value.Tarjeta
  }
console.log(this.carritoProductos)
this.ordenService.agregarOrden(ordenCompra).subscribe(data=>{
  if(data[0].id){
    this.idCompra = data[0].id
    this.notificacion.onSuccess('Compra correctamente realizada','')

    for(let i = 0; i < this.carritoProductos.length; i++ ){
      const ProductosCompra: CompraVentaModel = {
        Id_Producto: this.carritoProductos[i].Id_Producto,
        Cantidad: this.carritoProductos[i].Cantidad,
        Precio: this.carritoProductos[i].Precio,
        PrecioTotal: this.carritoProductos[i].PrecioTotal,
        Id_Orden:this.idCompra, 
        Id_Vendedor: this.carritoProductos[i].Vendedor, 
        Id_Cliente: Number(sessionStorage.getItem('id_user')),
      }
      this.compraVentaService.CompraVenta(ProductosCompra).subscribe(data=>{
      })
    }


  }
})

}


}
