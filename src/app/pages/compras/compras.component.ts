import { Component, OnInit } from '@angular/core';
import { NgxToastService } from 'ngx-toast-notifier';
import { UsuarioModel } from 'src/app/Models/UsuarioModel';
import { CompraVentaService } from 'src/app/Services/compra-venta.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  paginaActual=1;
  listProductos:any;

  constructor(private notificaciones: NgxToastService,
              private compraVentaService:CompraVentaService) { }

  ngOnInit(): void {
   this.listarCompras()
  }

  listarCompras(){
    const id:UsuarioModel={
  Id_Usuario:Number(sessionStorage.getItem('id_user'))
    }
    this.compraVentaService.listarCompras(id).subscribe(data=>{
this.listProductos = data;
console.log(data)
    })
  }

}
