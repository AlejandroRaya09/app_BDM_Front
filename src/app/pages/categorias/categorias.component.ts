import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoriaModel } from '../../Models/CategoriaModel';

const ELEMENT_DATA: string[] = [];

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent implements OnInit {
  displayedColumns: string[] = ['', '', '', ''];
  dataSource = ELEMENT_DATA;

  //FORMGROUP
  categoriaForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.categoriaForm = this.fb.group({
      Nombre:['',Validators.required],
      Descripcion:['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.listarCategorias();
  }

  agregar_editarCatego(){
    const Categoria: CategoriaModel = {
      NombreCatego: this.categoriaForm.value.Nombre,
      DescripcionCatego: this.categoriaForm.value.Descripcion,
      Id_Usuario: 1 //CAMBIAR
    }
    console.log(Categoria)
    //LLAMADO API A INSERTAR CATEGORIA 
  }

  listarCategorias(){
    //LLAMADO API PARA LISTAR EN TABLA
  }
}
