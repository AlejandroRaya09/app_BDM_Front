import { Component, OnInit } from '@angular/core';
import { NgxToastService } from 'ngx-toast-notifier';
import { CotizacionService } from '../../Services/cotizacion.service';
import { CotizacionModel } from '../../Models/CotizacionModel';

@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.component.html',
  styleUrls: ['./cotizaciones.component.css']
})
export class CotizacionesComponent implements OnInit {

  paginaActual=1;
  listProductos:any;
  opcionCotizar:string = '';

  constructor(private notificaciones: NgxToastService,
              private cotizacionService: CotizacionService) { }

  ngOnInit(): void {
    this.listarCotizacionVendedor();
  }


  listarCotizacionVendedor(){
    const usuario: CotizacionModel = {
      Id_Vendedor: Number(sessionStorage.getItem('id_user'))
    }
    this.cotizacionService.listarCotizacionesVendedor(usuario).subscribe(data=>{
      this.listProductos=data
      if(this.listProductos.Estado == 'Pendiente'){
        this.opcionCotizar = 'Pendiente'
      }
    })
  }



  aceptarOferta(prod:any){
    const cotizacion:CotizacionModel={
      Id_Cotizacion:prod.Id_Cotizacion
    }
    this.cotizacionService.aceptarOferta(cotizacion).subscribe(data=>{
      if(data[0].msg){
        this.notificaciones.onSuccess('Oferta acpetada','')
        this.opcionCotizar = 'Respuesta'
        this.listarCotizacionVendedor();
      }
    })
  }

  negarOferta(prod:any){
    const cotizacion:CotizacionModel={
      Id_Cotizacion:prod.Id_Cotizacion
    }
    this.cotizacionService.negarOferta(cotizacion).subscribe(data=>{
      if(data[0].msg){
        this.notificaciones.onSuccess('Oferta denegada','')
        this.opcionCotizar = 'Respuesta'
        this.listarCotizacionVendedor();
      }
    })
  }
}
