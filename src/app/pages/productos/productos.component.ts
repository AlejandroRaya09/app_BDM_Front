import { Component, OnInit } from '@angular/core';
import { FormArray,FormBuilder,FormGroup,Validators } from '@angular/forms';
import { TipoVenta } from 'src/app/Models/GenericosModel';
import { ProductoModel } from 'src/app/Models/ProductoModel';
import { CategoriaService } from '../../Services/categoria.service';
import { NgxToastService } from 'ngx-toast-notifier';
import { CategoriaDetalleModel } from '../../Models/CategoriaModel';
import { ProductoService } from '../../Services/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})

export class ProductosComponent implements OnInit {
  //LISTA DE TIPOS DE VENTA DE PRODUCTO
  Tipo: TipoVenta[] = [{ tipo: 'Vender' }, { tipo: 'Cotizar' }];
  //LISTAS Y VARIABLES 
  CategoriasLista:any;
  ListaProductos:any;
  paginaActual=1;
  Agregar_Editar:string = 'Agregar'
  Id_Edit:number=0;
  listaCategoriasProd:any;

  //FORMGROUP
  productoForm: FormGroup;
  categorias!: FormArray;

  constructor(private fb: FormBuilder,
    private serviceCategoria: CategoriaService,
    private notificaciones:NgxToastService,
    private productoService:ProductoService) {

    this.productoForm = this.fb.group({
      Nombre: ['', Validators.required],
      Descripcion: ['', Validators.required],
      Tipo: ['', Validators.required],
      Precio: [''],
      Cantidad: ['', Validators.required],
      //Video:['',Validators.required],
      //Imagen: new FormArray([]),
      Categorias: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.listarProductos();
    this.listarCategorias();
  }

  agregarProducto() {
    if(this.productoForm.valid){
    const Producto: ProductoModel = {
      NombreProducto: this.productoForm.value.Nombre,
      Descripcion: this.productoForm.value.Descripcion,
      Tipo: this.productoForm.value.Tipo,
      Precio: this.productoForm.value.Precio || 0,
      Cantidad: this.productoForm.value.Cantidad,
      Id_Usuario: Number(sessionStorage.getItem('id_user'))
    };
    this.productoService.agregarProducto(Producto).subscribe(data=>{

      if(data[0].id){
        const CategoDetalle: CategoriaDetalleModel = {
          Id_Categoria:this.productoForm.value.Categorias,
          Id_Producto:(data[0].id)
      }
      this.serviceCategoria.agregarCategoriaDetalle(CategoDetalle).subscribe(data=>{
        if(data[0].msg){
          this.notificaciones.onSuccess('Correcto','producto agregado');
          this.listarProductos();
        }
      })
    }
    })
  }else{
    this.notificaciones.onWarning('Advertencia','LLENE TODOS LOS CAMPOS REQUERIDOS');
    this.productoForm.markAllAsTouched();
  }
}

  listarProductos() {
    const Producto: ProductoModel = {
      Id_Usuario: Number(sessionStorage.getItem('id_user'))
    };
    this.productoService.listarProductosVendedor(Producto).subscribe(data=>{
      this.ListaProductos = data;
      console.log(data)
    })
  }

  listarCategorias(){
    this.serviceCategoria.listarCategorias().subscribe(data=>{
      this.CategoriasLista = data
    })
  }

  EditarProd(id:number){
    this.Agregar_Editar = 'Editar'
    this.notificaciones.onInfo('Info','Puede Editar los campos habilitados');
    this.Id_Edit = id;
    const Producto: ProductoModel = { Id_Producto: id };
    this.productoService.listarProductoIDVendedor(Producto).subscribe((data) => {
      this.productoForm.get('Nombre')?.setValue(data[0].NombreProducto);
      this.productoForm.get('Descripcion')?.setValue(data[0].Descripcion);
      this.productoForm.get('Precio')?.setValue(data[0].Precio) || 0;
    });
  }

  guardarEdicion(){
      const Producto: ProductoModel = {
        Id_Producto:this.Id_Edit,
        NombreProducto:this.productoForm.value.Nombre,
        Descripcion:this.productoForm.value.Descripcion,
        Precio:this.productoForm.value.Precio
      };
      this.productoService.editarProducto(Producto).subscribe((data) => {
        if (data[0].msg) {
          this.notificaciones.onDanger('Error', data[0].msg);
        } else {
          this.notificaciones.onSuccess('La edicion se completo satisfactoriamente','');
          this.Id_Edit = 0;
          this.productoForm.clearValidators;
          this.productoForm.reset();
          this.Agregar_Editar = 'Agregar';
        }
        this.listarProductos();
      });
  }

  eliminarProducto(id: number) {
    const Producto: ProductoModel = {Id_Producto:id}
    this.productoService.eliminarProducto(Producto).subscribe((data) => {
      if (data[0].id) {
        this.notificaciones.onSuccess('Producto Eliminada Correctamente', '');
        this.productoForm.clearValidators;
        this.productoForm.reset();
        this.listarProductos();
      }
    });
  }

  agregarCategoria(id:number){
    this.Id_Edit = id;
    this.Agregar_Editar = 'Categoria'
    const Producto: ProductoModel = {Id_Producto:id}
    this.productoService.listarProductosVendedorCategoria(Producto).subscribe(data=>{
this.listaCategoriasProd = data
    })
  }

  guardarCategoria(){
   const CategoDetalle: CategoriaDetalleModel = {
      Id_Categoria:this.productoForm.value.Categorias,
      Id_Producto:(this.Id_Edit)
  }
    this.serviceCategoria.agregarCategoriaDetalle(CategoDetalle).subscribe(data=>{
      if(data[0].msg){
        this.notificaciones.onSuccess('Correcto','categoria añadida');

        const Producto: ProductoModel = {Id_Producto:this.Id_Edit}
        this.productoService.listarProductosVendedorCategoria(Producto).subscribe(data=>{
          this.listaCategoriasProd = data
      })
      }
    })
  }


  eliminarCategoProd(id:number){
    const CategoDetalle: CategoriaDetalleModel = {
      Id_CategoriaDetalle:id
  }
  this.serviceCategoria.eliminarCategoriaDetalle(CategoDetalle).subscribe(data=>{
    if(data[0].msg){
      this.notificaciones.onSuccess('Correcto','categoria eliminada');

      const Producto: ProductoModel = {Id_Producto:this.Id_Edit}
      this.productoService.listarProductosVendedorCategoria(Producto).subscribe(data=>{
        this.listaCategoriasProd = data
    })
    }
  })
  }

  agregarExistencias(id:number){
this.Agregar_Editar='Cantidad'
this.notificaciones.onInfo('Info','Puede agregar existencias');
this.Id_Edit = id;
const Producto: ProductoModel = { Id_Producto: id };
this.productoService.listarProductoIDVendedor(Producto).subscribe((data) => {
  this.productoForm.get('Cantidad')?.setValue(data[0].Cantidad);
})
  }
  
  guardarExistencia(){
    const Producto: ProductoModel = {
       Id_Producto: this.Id_Edit,
       Cantidad: this.productoForm.value.Cantidad
     };
     this.productoService.agregarExistencias(Producto).subscribe(data=>{
      if(data[0].id){
        this.notificaciones.onSuccess('Correcto','insumos añadidos');
        this.Id_Edit = 0;
        this.productoForm.clearValidators;
        this.productoForm.reset();
        this.Agregar_Editar = 'Agregar';
      }
      this.listarProductos();
     })
  }


}
