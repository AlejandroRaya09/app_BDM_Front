
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxToastService } from 'ngx-toast-notifier';
import { DomicilioModel } from 'src/app/Models/DomicilioModel';
import { TarjetaModel } from '../../Models/TarjetaModel';
import { DomicilioService } from '../../Services/domicilio.service';

@Component({
  selector: 'app-metodos-pago',
  templateUrl: './metodos-pago.component.html',
  styleUrls: ['./metodos-pago.component.css']
})
export class MetodosPagoComponent implements OnInit {

  //PAGINA ACTUAL PARA EL PAGINADOR
  paginaActualDom: number = 1;
  paginaActualTar: number = 1;
  //VARIABLES GLOBALES
  Agregar_EditarDom: string = 'Agregar'; //CONTROLADOR PARA SABER SI SE EL BOTON DE EDITAR O AGREGAR
  Agregar_EditarTar: string = 'Agregar'; //CONTROLADOR PARA SABER SI SE EL BOTON DE EDITAR O AGREGAR
  Id_EditDom: number = 0; //GUARDAR ID A EDITAR
  Id_EditTar: number = 0; //GUARDAR ID A EDITAR
  listaDomicilios: any; //GUARDAR VALORES DE LAS LISTAS DE CATEGORIAS EN BD

    //FORMGROUP
    tarjetaForm: FormGroup;
    domicilioForm: FormGroup;

  constructor(private fb: FormBuilder,
    private domicilioService:DomicilioService,
    private notificaciones: NgxToastService) { 

    this.domicilioForm = this.fb.group({
      Calle: ['', Validators.required],
      Numero: [,Validators.required],
      Colonia: ['', Validators.required],
      Cp: [, Validators.required],
      Municipio: ['', Validators.required],
      Estado:['', Validators.required]
    })

    this.tarjetaForm = this.fb.group({
      Num_Tarjeta: [,Validators.required],
      Nom_Tarjeta: ['', Validators.required],
      Banco: ['', Validators.required],
      Caducidad: ['', Validators.required]
    })
  }


  agregarDomicilio(){
    if (this.domicilioForm.valid) {
    const Domicilio: DomicilioModel = {
      Calle: this.domicilioForm.value.Calle,
      Numero: this.domicilioForm.value.Numero,
      Colonia: this.domicilioForm.value.Colonia,
      CP: this.domicilioForm.value.Cp,
      Estado: this.domicilioForm.value.Estado,
      Municipio: this.domicilioForm.value.Municipio, 
      Id_Usuario:Number(sessionStorage.getItem('id_user'))
    };
    console.log(Domicilio)
      this.domicilioService.agregarDomicilio(Domicilio).subscribe((data) => {
        console.log(data)
        if (data[0].msg) {
          this.notificaciones.onDanger('Error', data[0].msg);
        } else {
          this.notificaciones.onSuccess('Correcto','Domicilio creado satisfactoriamente');
          this.domicilioForm.reset();
          this.domicilioForm.clearValidators();
          //VOLVER A LISTAR LAS CATEGORIAS
          this.listarDomicilios();
        }
      });
    } else {
      this.notificaciones.onWarning('Advertencia','LLENE TODOS LOS CAMPOS REQUERIDOS');
      this.domicilioForm.markAllAsTouched();
    }

  }


  agregarTarjeta(){
    const Tarjeta: TarjetaModel = {
      Num_Tarjeta: this.tarjetaForm.value.Num_Tarjeta,
      Nom_Tarjeta: this.tarjetaForm.value.Nom_Tarjeta, 
      Banco: this.tarjetaForm.value.Banco, 
      Caducidad: this.tarjetaForm.value.Caducidad, 
      Id_Usuario:Number(sessionStorage.getItem('id_user'))
    }
    console.log(Tarjeta)
  }

  ngOnInit(): void {
    this.listarDomicilios();
    this.listarTarjetas();
  }


  listarDomicilios(){
    const Domicilio: DomicilioModel = {Id_Usuario: Number(sessionStorage.getItem('id_user'))};
    this.domicilioService.listarDomicilios(Domicilio).subscribe(data=>{
      this.listaDomicilios=data
    })
  }
  listarTarjetas(){
    //LISTAR TARJETAS
  }
}
