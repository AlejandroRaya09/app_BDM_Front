import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TipoVenta } from 'src/app/Models/GenericosModel';
import { ProductoModel } from 'src/app/Models/ProductoModel';



@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  //LISTA DE TIPOS DE VENTA DE PRODUCTO
  Tipo: TipoVenta[] = [{tipo:'Vender'},{tipo:'Cotizar'}];

  //FORMGROUP
  productoForm: FormGroup;
  categorias:FormControl | undefined;
  
  constructor(private fb: FormBuilder) {
    this.productoForm = this.fb.group({
      Nombre:['',Validators.required],
      Descripcion:['', Validators.required],
      Tipo:['',Validators.required],
      Precio:['',Validators.required],
      Cantidad:['',Validators.required],
      //Video:['',Validators.required],
      //Imagen: new FormArray([]),
      //Categorias:['',Validators.required]
    })
  }

  ngOnInit(): void {
    this.listarProductos()
  }

  agregar_editarProducto(){
    const Producto: ProductoModel = {
      NombreProducto: this.productoForm.value.Nombre,
      Descripcion: this.productoForm.value.Descripcion,
      Tipo: this.productoForm.value.Tipo,
      Precio: this.productoForm.value.Precio,
      Cantidad: this.productoForm.value.Cantidad,
      Id_Usuario: 1, //CAMBIAR
    }
    console.log(Producto);
    //LLAMADO API A INSERTAR PRODUCTO
  }

  listarProductos(){
    //LLAMADO API PARA LISTAR EN TABLA
  }

}
