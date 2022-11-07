import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoLista } from 'src/app/Models/GenericosModel';
import { ListaModel } from 'src/app/Models/ListaModel';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.css']
})
export class ListasComponent implements OnInit {

  //LISTA DE TIPOS DE VENTA DE PRODUCTO
  Tipo: TipoLista[] = [{tipo:'Publica'},{tipo:'Privada'}];

    //FORMGROUP
    listaForm: FormGroup;

  constructor(private fb: FormBuilder) { 
    this.listaForm = this.fb.group({
      Nombre:['',Validators.required],
      Descripcion:['', Validators.required],
      Tipo: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.listarListas();
  }


  agregar_lista(){
    const Lista: ListaModel = {
      NombreLista: this.listaForm.value.Nombre,
      DescripcionLista: this.listaForm.value.Descripcion,
      tipoLista: this.listaForm.value.Tipo,
      Id_Usuario: 1 //CAMBIAR
    }
    console.log(Lista)
    //LLAMADO API A INSERTAR CATEGORIA 
  }

  listarListas(){
  //LLAMADO API PARA LISTAR EN TABLA
  }
}
