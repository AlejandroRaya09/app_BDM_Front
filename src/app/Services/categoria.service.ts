import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaDetalleModel, CategoriaModel } from '../Models/CategoriaModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  UrlApp: string; 

  constructor(private http: HttpClient) {
    this.UrlApp = 'http://localhost/Proyectos/Back_Bdm_Php/controller/categorias.php?op=';
   }

   agregarCategoria(categoria: CategoriaModel):Observable<any>{
    let direccion = this.UrlApp + 'agrearCategoria';
    return this.http.post<any>(direccion,categoria);
  }

  listarCategorias():Observable<any>{
    let direccion = this.UrlApp + 'listarCategorias';
    return this.http.get<any>(direccion);
  }

  listarCategoriaID(categoria: CategoriaModel):Observable<any>{
    let direccion = this.UrlApp + 'listarCategoriaID';
    return this.http.post<any>(direccion,categoria);
  }
  
  editarCategoria(categoria: CategoriaModel):Observable<any>{
    let direccion = this.UrlApp + 'editarCategoria';
    return this.http.post<any>(direccion,categoria);
  }

  eliminarCategoria(categoria: CategoriaModel):Observable<any>{
    let direccion = this.UrlApp + 'eliminarCategoria';
    return this.http.post<any>(direccion,categoria);
  }

  agregarCategoriaDetalle(categoriaDetalle: CategoriaDetalleModel):Observable<any>{
    let direccion = this.UrlApp + 'agregarCategoriaDetalle';
    return this.http.post<any>(direccion,categoriaDetalle);
  }

  eliminarCategoriaDetalle(categoriaDetalle: CategoriaDetalleModel):Observable<any>{
    let direccion = this.UrlApp + 'eliminarCategoriaDetalle';
    return this.http.post<any>(direccion,categoriaDetalle);
  }
}
