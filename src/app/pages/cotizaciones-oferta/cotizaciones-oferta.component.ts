import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxToastService } from 'ngx-toast-notifier';
import { CotizacionModel } from '../../Models/CotizacionModel';
import { CotizacionService } from '../../Services/cotizacion.service';


@Component({
  selector: 'app-cotizaciones-oferta',
  templateUrl: './cotizaciones-oferta.component.html',
  styleUrls: ['./cotizaciones-oferta.component.css']
})
export class CotizacionesOfertaComponent implements OnInit {
  cotizar!: FormGroup;
  
  constructor(public dialogref: MatDialogRef<CotizacionesOfertaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificacion: NgxToastService,
    private fb: FormBuilder,
    private cotizarService: CotizacionService) { 
      
      this.cotizar = this.fb.group({
        Cotizacion: ['', Validators.required]
      });
    }

  ngOnInit(): void {
  }

  enviar(){
    const enviar: CotizacionModel ={
      Id_Producto:this.data.Id_Producto,
      Id_Vendedor:this.data.Id_Usuario,
      Id_Cliente: Number(sessionStorage.getItem('id_user')),
      Precio: this.cotizar.value.Cotizacion
    }
    this.cotizarService.ofertar(enviar).subscribe(data=>{
      if(data[0].msg){
        this.notificacion.onSuccess('Enviado','Oferta a espera de respuesta')
        this.dialogref.close();
      }
    })
  }




  cerrar(){
    this.dialogref.close();
  }

}
