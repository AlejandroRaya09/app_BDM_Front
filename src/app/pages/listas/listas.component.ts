import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoLista } from 'src/app/Models/GenericosModel';
import { ListaModel } from 'src/app/Models/ListaModel';
import { ListaService } from '../../Services/lista.service';
import { NgxToastService } from 'ngx-toast-notifier';
import { ListaDetalleModel } from '../../Models/ListaModel';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.css'],
})
export class ListasComponent implements OnInit {
  //LISTA DE TIPOS DE VENTA DE PRODUCTO
  Tipo: TipoLista[] = [{ tipo: 'Publica' }, { tipo: 'Privada' }];
  //FORMGROUP
  listaForm: FormGroup;
  //PAGINA ACTUAL PARA EL PAGINADOR
  paginaActual: number = 1;
  //VARIABLES GLOBALES
  Agregar_Editar: string = 'Agregar'; //CONTROLADOR PARA SABER SI SE EL BOTON DE EDITAR O AGREGAR
  Id_Edit: number = 0; //GUARDAR ID A EDITAR
  listAllLista: any; //GUARDAR VALORES DE LAS LISTAS DE CATEGORIAS EN BD
  listaActiva: any;
  listaDetalle:any;
  constructor(private fb: FormBuilder, 
    private listaService: ListaService,
    private notificaciones: NgxToastService) {
    this.listaForm = this.fb.group({
      Nombre: ['', Validators.required],
      Descripcion: ['', Validators.required],
      Tipo: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.listarListas();
    this.listaActual()
  }

  agregar_lista() {
    if (this.listaForm.valid) {
      const Lista: ListaModel = {
        NombreLista: this.listaForm.value.Nombre,
        DescripcionLista: this.listaForm.value.Descripcion,
        tipoLista: this.listaForm.value.Tipo,
        Id_Usuario: Number(sessionStorage.getItem('id_user')),
      };
      this.listaService.agregarLista(Lista).subscribe((data) => {
        if (data[0].msg) {
          this.notificaciones.onDanger('Error', data[0].msg);
        } else {
          this.notificaciones.onSuccess('Correcto','Lista creada satisfactoriamente');
          this.listaForm.reset();
          this.listaForm.clearValidators();
          //VOLVER A LISTAR LAS CATEGORIAS
          this.listarListas();
          this.listaActual();
        }
      });
    } else {
      this.notificaciones.onWarning('Advertencia','LLENE TODOS LOS CAMPOS REQUERIDOS');
      this.listaForm.markAllAsTouched();
    }
  }

  listarListas() {
    const Lista: ListaModel = {Id_Usuario: Number(sessionStorage.getItem('id_user'))};
    this.listaService.listaAllListas(Lista).subscribe(data=>{
      this.listAllLista=data
    })
  }

  clickEditar(id:number){
    this.Id_Edit = id;
    const Lista: ListaModel = { Id_Lista: id };
    this.listaService.listarIDLista(Lista).subscribe((data) => {
      this.listaForm.get('Nombre')?.setValue(data[0].NombreLista);
      this.listaForm.get('Descripcion')?.setValue(data[0].DescripcionLista);
      this.listaForm.get('Tipo')?.setValue(data[0].tipoLista);
      this.Agregar_Editar = 'Editar';
    });
  }

  eliminarLista(id:number){
    const Lista: ListaModel = { Id_Lista: id };
    this.listaService.eliminarLista(Lista).subscribe(data => {
      if (data[0].id) {
        this.notificaciones.onSuccess('Lista Eliminada Correctamente', '');
        this.listaForm.clearValidators;
        this.listaForm.reset();
        this.listarListas();
      }
    })
  }

  guardar_Edicion(){
    if(this.listaForm.valid){
    const Lista: ListaModel = {
      Id_Lista: this.Id_Edit,
      NombreLista: this.listaForm.value.Nombre,
      DescripcionLista: this.listaForm.value.Descripcion,
      tipoLista: this.listaForm.value.Tipo,
      Id_Usuario: Number(sessionStorage.getItem('id_user'))
    };
    this.listaService.editarLista(Lista).subscribe((data) => {
      if (data[0].msg) {
        this.notificaciones.onDanger('Error', data[0].msg);
      } else {
        this.notificaciones.onSuccess('La edicion se completo satisfactoriamente','' );
        this.Id_Edit = 0;
        this.listaForm.clearValidators;
        this.listaForm.reset();
        this.Agregar_Editar = 'Agregar';
      }
      this.listarListas();
      this.listaActual();
    });
  }else{
  this.notificaciones.onWarning('Advertencia','LLENE TODOS LOS CAMPOS REQUERIDOS');
  this.listaForm.markAllAsTouched();
  }
}


listaActual(){
  const Lista: ListaModel = {Id_Usuario: Number(sessionStorage.getItem('id_user'))};
  this.listaService.listarListaACTIVA(Lista).subscribe(data=>{
    this.listaActiva = data[0].NombreLista
    sessionStorage.setItem('ListaActiva',this.listaActiva)
    sessionStorage.setItem('ListaActivaID',String( data[0].Id_Lista))
  })
}

hacerActiva(id:number){
  const Lista: ListaModel = {Id_Usuario: Number(sessionStorage.getItem('id_user')), Id_Lista:id};
  this.listaService.hacerActiva(Lista).subscribe(data=>{
    if(data[0].id){
      this.notificaciones.onSuccess('Lista Activa','cambiada con exito')
      sessionStorage.setItem('ListaActivaID',String(id))
      this.listaActual();
    }
  })
}

VerDetalles(id:number){
this.Agregar_Editar='VER'
const Lista: ListaModel = {Id_Lista:id};
this.listaService.ListaDetalle(Lista).subscribe(data=>{
  this.listaDetalle = data
  this.notificaciones.onInfo('Productos','agregados a la WishList')
})
}

borrarDETALLE(id:number){
  const ListaDetalle: ListaDetalleModel = {Id_Lista_Detalle:id};
  this.listaService.EliminarDetalle(ListaDetalle).subscribe(data=>{
    if(data[0].id){
      this.notificaciones.onSuccess('Prodducto','Eliminado')
    }
   this.listarListas();
   this.listaActual();
  })
}


}
