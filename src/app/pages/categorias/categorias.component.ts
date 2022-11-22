import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaModel } from '../../Models/CategoriaModel';
import { NgxToastService } from 'ngx-toast-notifier';
import { CategoriaService } from '../../Services/categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent implements OnInit {
  //FORMGROUP
  categoriaForm: FormGroup;
  //PAGINA ACTUAL PARA EL PAGINADOR
  paginaActual: number = 1;
  //VARIABLES GLOBALES
  Agregar_Editar: string = 'Agregar'; //CONTROLADOR PARA SABER SI SE EL BOTON DE EDITAR O AGREGAR
  Id_Edit: number = 0; //GUARDAR ID A EDITAR
  listCatego: any; //GUARDAR VALORES DE LAS LISTAS DE CATEGORIAS EN BD

  constructor(
    private fb: FormBuilder,
    private notificaciones: NgxToastService,
    private categoriaService: CategoriaService
  ) {
    this.categoriaForm = this.fb.group({
      Nombre: [, Validators.required],
      Descripcion: [, Validators.required],
    });
  }

  ngOnInit(): void {
    this.listarCategorias();
  }

  agregarCatego() {
    if (this.categoriaForm.valid) {
      const Categoria: CategoriaModel = {
        NombreCatego: this.categoriaForm.value.Nombre,
        DescripcionCatego: this.categoriaForm.value.Descripcion,
        Id_Usuario: Number(sessionStorage.getItem('id_user')),
      };
      this.categoriaService.agregarCategoria(Categoria).subscribe((data) => {
        if (data[0].msg) {
          this.notificaciones.onDanger('Error', data[0].msg);
        } else {
          this.notificaciones.onSuccess('Correcto','Categoria creada satisfactoriamente');
          this.categoriaForm.reset();
          this.categoriaForm.clearValidators();
          //VOLVER A LISTAR LAS CATEGORIAS
          this.listarCategorias();
        }
      });
    } else {
      this.notificaciones.onWarning('Advertencia','LLENE TODOS LOS CAMPOS REQUERIDOS');
      this.categoriaForm.markAllAsTouched();
    }
  }

  listarCategorias() {
    this.categoriaService.listarCategorias().subscribe((data) => {
      this.listCatego = data;
    });
  }

  clickEditar(id: number) {
    this.Id_Edit = id;
    const Categoria: CategoriaModel = { Id_Categoria: id };
    this.categoriaService.listarCategoriaID(Categoria).subscribe((data) => {
      this.categoriaForm.get('Nombre')?.setValue(data[0].NombreCatego);
      this.categoriaForm.get('Descripcion')?.setValue(data[0].DescripcionCatego);
      this.Agregar_Editar = 'Editar';
    });
  }

  guardarEdicion() {
    const Categoria: CategoriaModel = {
      Id_Categoria: this.Id_Edit,
      NombreCatego: this.categoriaForm.value.Nombre,
      DescripcionCatego: this.categoriaForm.value.Descripcion,
    };
    this.categoriaService.editarCategoria(Categoria).subscribe((data) => {
      if (data[0].msg) {
        this.notificaciones.onDanger('Error', data[0].msg);
      } else {
        this.notificaciones.onSuccess('La edicion se completo satisfactoriamente','' );
        this.Id_Edit = 0;
        this.categoriaForm.clearValidators;
        this.categoriaForm.reset();
        this.Agregar_Editar = 'Agregar';
      }
      this.listarCategorias();
    });
  }


  eliminarCatego(id: number) {
    const Categoria: CategoriaModel = { Id_Categoria: id };
    this.categoriaService.eliminarCategoria(Categoria).subscribe(data => {
      if (data[0].id) {
        this.notificaciones.onSuccess('Categoria Eliminada Correctamente', '');
        this.categoriaForm.clearValidators;
        this.categoriaForm.reset();
        this.listarCategorias();
      }
    })
  }
}
