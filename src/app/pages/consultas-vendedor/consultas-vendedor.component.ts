import { Component, OnInit } from '@angular/core';
import { NgxToastService } from 'ngx-toast-notifier';
import { ProductoService } from 'src/app/Services/producto.service';

@Component({
  selector: 'app-consultas-vendedor',
  templateUrl: './consultas-vendedor.component.html',
  styleUrls: ['./consultas-vendedor.component.css']
})
export class ConsultasVendedorComponent implements OnInit {

  paginaActual=1;
  listProductos:any;

  constructor(private notificaciones: NgxToastService,
              private productoService: ProductoService) { }

  ngOnInit(): void {
  }

}
