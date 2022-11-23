import { Component, OnInit } from '@angular/core';
import { NgxToastService } from 'ngx-toast-notifier';
import { ProductoService } from '../../Services/producto.service';
import { ProductoModel } from '../../Models/ProductoModel';

@Component({
  selector: 'app-autorizar',
  templateUrl: './autorizar.component.html',
  styleUrls: ['./autorizar.component.css'],
})
export class AutorizarComponent implements OnInit {
  paginaActual: number = 1;
  listProductos: any;
  constructor(
    private notificaciones: NgxToastService,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    this.listarProductos();
  }

  listarProductos() {
    const producto: ProductoModel = {};
    this.productoService.listarProductoADMIN(producto).subscribe((data) => {
      this.listProductos = data;
    });
  }

  Autorizar(id:number){
    const producto: ProductoModel = { 
      Id_Producto: id,
      Id_Usuario: Number(sessionStorage.getItem('id_user'))
    };
    this.productoService.autorizarProd(producto).subscribe(data=>{
      if(data[0].id){
        this.notificaciones.onSuccess('Autorizado','Producto listo para la venta')
      }
    })
    this.listarProductos();
  }

  No_Autorizar(id:number){
    const producto: ProductoModel = { 
      Id_Producto: id,
      Id_Usuario: Number(sessionStorage.getItem('id_user'))
    };
    this.productoService.NoautorizarProd(producto).subscribe(data=>{
      if(data[0].id){
        this.notificaciones.onSuccess('No Autorizado','Producto denegado para la venta')
      }
    })
    this.listarProductos();
  }
}
