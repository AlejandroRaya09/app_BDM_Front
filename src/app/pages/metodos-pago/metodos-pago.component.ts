
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxToastService } from 'ngx-toast-notifier';
import { DomicilioModel } from 'src/app/Models/DomicilioModel';
import { TarjetaModel } from '../../Models/TarjetaModel';
import { DomicilioService } from '../../Services/domicilio.service';
import { TarjetaService } from '../../Services/tarjeta.service';

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
  listaDomicilios: any; //GUARDAR VALORES DE LAS LISTAS DE DOMICILIOS EN BD
  listaTarjetas: any; //GUARDAR VALORES DE LAS LISTAS DE TARJETAS EN BD

    //FORMGROUP
    tarjetaForm: FormGroup;
    domicilioForm: FormGroup;

  constructor(private fb: FormBuilder,
    private domicilioService:DomicilioService,
    private tarjetaService:TarjetaService,
    private notificaciones: NgxToastService) { 

    this.domicilioForm = this.fb.group({
      Calle: ['', Validators.required],
      Numero: [,Validators.required],
      Colonia: ['', Validators.required],
      Cp: [, [Validators.required,Validators.maxLength(4)]],
      Municipio: ['', Validators.required],
      Estado:['', Validators.required]
    })

    this.tarjetaForm = this.fb.group({
      Num_Tarjeta: ['',[Validators.required, Validators.maxLength(16)]],
      Nom_Tarjeta: ['', Validators.required],
      Banco: ['', Validators.required],
      Caducidad: ['', [Validators.required,Validators.maxLength(4)]]
    })
  }

  ngOnInit(): void {
    this.listarDomicilios();
    this.listarTarjetas();
  }

  listarTarjetas(){
    const Tarjeta: TarjetaModel = {Id_Usuario: Number(sessionStorage.getItem('id_user'))};
    this.tarjetaService.listarTarjetas(Tarjeta).subscribe(data=>{
      this.listaTarjetas=data
    })
  }

  agregarTarjeta(){
    if (this.tarjetaForm.valid) {
    const Tarjeta: TarjetaModel = {
      Num_Tarjeta: this.tarjetaForm.value.Num_Tarjeta,
      Nom_Tarjeta: this.tarjetaForm.value.Nom_Tarjeta, 
      Banco: this.tarjetaForm.value.Banco, 
      Caducidad: this.tarjetaForm.value.Caducidad, 
      Id_Usuario:Number(sessionStorage.getItem('id_user'))
    }
      this.tarjetaService.agregarTarjeta(Tarjeta).subscribe((data) => {
        if (data[0].msg) {
          this.notificaciones.onDanger('Error', data[0].msg);
        } else {
          this.notificaciones.onSuccess('Correcto','Tarjeta creada satisfactoriamente');
          this.tarjetaForm.reset();
          this.tarjetaForm.clearValidators();
          //VOLVER A LISTAR LAS Tarjetas
          this.listarTarjetas();
        }
      });
  }else {
    this.notificaciones.onWarning('Advertencia','LLENE TODOS LOS CAMPOS REQUERIDOS');
    this.tarjetaForm.markAllAsTouched();
  }
  }

  EditarTar(id:number){
    this.Id_EditTar = id;
    const Tarjeta: TarjetaModel = { Id_Tarjeta:id };
    this.notificaciones.onInfo('Puede editar','')
    this.tarjetaService.listarTarjetaID(Tarjeta).subscribe((data) => {
      console.log(data)
      this.tarjetaForm.get('Num_Tarjeta')?.setValue(data[0].Num_Tarjeta);
      this.tarjetaForm.get('Nom_Tarjeta')?.setValue(data[0].Nom_Tarjeta);
      this.tarjetaForm.get('Banco')?.setValue(data[0].Banco);
      this.tarjetaForm.get('Caducidad')?.setValue(data[0].Caducidad);
      this.Agregar_EditarTar= 'Editar';
    });
  }

  eliminarTar(id:number){
    const Tarjeta: TarjetaModel = { Id_Tarjeta:id };
    this.tarjetaService.eliminarTarjeta(Tarjeta).subscribe(data => {
      if (data[0].id) {
        this.notificaciones.onSuccess('Tarjeta Eliminada Correctamente', '');
        this.tarjetaForm.clearValidators;
        this.tarjetaForm.reset();
        this.listarTarjetas();
      }
    })
  }
  guardar_EdicionTar(){
    if(this.tarjetaForm.valid){
 const Tarjeta: TarjetaModel = {
  Id_Tarjeta:this.Id_EditTar,
  Num_Tarjeta: this.tarjetaForm.value.Num_Tarjeta,
  Nom_Tarjeta: this.tarjetaForm.value.Nom_Tarjeta, 
  Banco: this.tarjetaForm.value.Banco, 
  Caducidad: this.tarjetaForm.value.Caducidad, 
    };
    this.tarjetaService.editarTarjeta(Tarjeta).subscribe((data) => {
      if (data[0].msg) {
        this.notificaciones.onDanger('Error', data[0].msg);
      } else {
        this.notificaciones.onSuccess('La edicion se completo satisfactoriamente','' );
        this.Id_EditDom = 0;
        this.tarjetaForm.clearValidators;
        this.tarjetaForm.reset();
        this.Agregar_EditarTar = 'Agregar';
      }
      this.listarTarjetas();
    });
  }else{
  this.notificaciones.onWarning('Advertencia','LLENE TODOS LOS CAMPOS REQUERIDOS');
  this.tarjetaForm.markAllAsTouched();}
}










  //BLOQUE PARA GENERAR TODO DE LOS DOMICILIOS
  listarDomicilios(){
    const Domicilio: DomicilioModel = {Id_Usuario: Number(sessionStorage.getItem('id_user'))};
    this.domicilioService.listarDomicilios(Domicilio).subscribe(data=>{
      this.listaDomicilios=data
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

  EditarDom(id:number){
    this.Id_EditDom = id;
    const Domicilio: DomicilioModel = { Id_Domicilio:id };
    this.notificaciones.onInfo('Puede editar','')
    this.domicilioService.listarDomiciliosID(Domicilio).subscribe((data) => {
      console.log(data)
      this.domicilioForm.get('Calle')?.setValue(data[0].Calle);
      this.domicilioForm.get('Numero')?.setValue(data[0].Numero);
      this.domicilioForm.get('Colonia')?.setValue(data[0].Colonia);
      this.domicilioForm.get('Cp')?.setValue(data[0].CP);
      this.domicilioForm.get('Municipio')?.setValue(data[0].Municipio);
      this.domicilioForm.get('Estado')?.setValue(data[0].Estado);
      this.Agregar_EditarDom= 'Editar';
    });
  }

  eliminarDom(id:number){
    const Domicilio: DomicilioModel = { Id_Domicilio:id };
    this.domicilioService.eliminarDomicilio(Domicilio).subscribe(data => {
      if (data[0].id) {
        this.notificaciones.onSuccess('Domicilio Eliminado Correctamente', '');
        this.domicilioForm.clearValidators;
        this.domicilioForm.reset();
        this.listarDomicilios();
      }
    })
  }

  guardar_EdicionDom(){
    if(this.domicilioForm.valid){
 const Domicilio: DomicilioModel = {
  Id_Domicilio:this.Id_EditDom,
  Calle: this.domicilioForm.value.Calle,
  Numero: this.domicilioForm.value.Numero,
  Colonia: this.domicilioForm.value.Colonia,
  CP: this.domicilioForm.value.Cp,
  Estado: this.domicilioForm.value.Estado,
  Municipio: this.domicilioForm.value.Municipio, 
  Id_Usuario: Number(sessionStorage.getItem('id_user'))
    };
    this.domicilioService.editarDomicilio(Domicilio).subscribe((data) => {
      if (data[0].msg) {
        this.notificaciones.onDanger('Error', data[0].msg);
      } else {
        this.notificaciones.onSuccess('La edicion se completo satisfactoriamente','' );
        this.Id_EditDom = 0;
        this.domicilioForm.clearValidators;
        this.domicilioForm.reset();
        this.Agregar_EditarDom = 'Agregar';
      }
      this.listarDomicilios();
    });
  }else{
  this.notificaciones.onWarning('Advertencia','LLENE TODOS LOS CAMPOS REQUERIDOS');
  this.domicilioForm.markAllAsTouched();}
}
}
