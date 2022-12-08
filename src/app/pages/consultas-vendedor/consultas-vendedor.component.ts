import { Component, OnInit } from '@angular/core';
import { NgxToastService } from 'ngx-toast-notifier';
import { ProductoService } from 'src/app/Services/producto.service';
import { CompraVentaService } from '../../Services/compra-venta.service';
import { UsuarioModel } from '../../Models/UsuarioModel';

@Component({
  selector: 'app-consultas-vendedor',
  templateUrl: './consultas-vendedor.component.html',
  styleUrls: ['./consultas-vendedor.component.css']
})
export class ConsultasVendedorComponent implements OnInit {

  paginaActual=1;
  listProductos:any;

  constructor(private notificaciones: NgxToastService,
              private productoService: ProductoService,
              private compraVentaService:CompraVentaService) { }

  ngOnInit(): void {
   this.listarVentas()
  }

  listarVentas(){
    const id:UsuarioModel={
  Id_Usuario:Number(sessionStorage.getItem('id_user'))
    }
    this.compraVentaService.listarVentas(id).subscribe(data=>{
this.listProductos = data;
console.log(data)
    })
  }


}
