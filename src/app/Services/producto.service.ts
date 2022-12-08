import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductoModel } from '../Models/ProductoModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  UrlApp: string; 

  constructor(private http: HttpClient) {
    this.UrlApp = 'http://localhost/Proyectos/Back_Bdm_Php/controller/productos.php?op=';
   }

   agregarProducto(producto: ProductoModel):Observable<any>{
    let direccion = this.UrlApp + 'agregarProducto';
    return this.http.post<any>(direccion,producto);
  }

  listarProductosVendedor(producto: ProductoModel):Observable<any>{
    let direccion = this.UrlApp + 'listarProductosVendedor';
    return this.http.post<any>(direccion,producto);
  }

  listarProductoIDVendedor(producto: ProductoModel):Observable<any>{
    let direccion = this.UrlApp + 'listarProductoIDVendedor';
    return this.http.post<any>(direccion,producto);
  }

  editarProducto(producto: ProductoModel):Observable<any>{
    let direccion = this.UrlApp + 'editarProducto';
    return this.http.post<any>(direccion,producto);
  }
  
  eliminarProducto(producto: ProductoModel):Observable<any>{
    let direccion = this.UrlApp + 'eliminarProducto';
    return this.http.post<any>(direccion,producto);
  }

  listarProductosVendedorCategoria(producto: ProductoModel):Observable<any>{
    let direccion = this.UrlApp + 'listarProductosVendedorCategoria';
    return this.http.post<any>(direccion,producto);
  }

  agregarExistencias(producto: ProductoModel):Observable<any>{
    let direccion = this.UrlApp + 'agregarExistencias';
    return this.http.post<any>(direccion,producto);
  }

  listarProductoADMIN(producto: ProductoModel):Observable<any>{
    let direccion = this.UrlApp + 'listarProductoADMIN';
    return this.http.post<any>(direccion,producto);
  }

  autorizarProd(producto: ProductoModel):Observable<any>{
    let direccion = this.UrlApp + 'autorizarProd';
    return this.http.post<any>(direccion,producto);
  }

  NoautorizarProd(producto: ProductoModel):Observable<any>{
    let direccion = this.UrlApp + 'NoautorizarProd';
    return this.http.post<any>(direccion,producto);
  }

  listarProductosFav(producto: ProductoModel):Observable<any>{
    let direccion = this.UrlApp + 'listarProductosFav';
    return this.http.post<any>(direccion,producto);
  }

  listarProductosTODOS(producto: ProductoModel):Observable<any>{
    let direccion = this.UrlApp + 'listarProductosTODOS';
    return this.http.post<any>(direccion,producto);
  }

  listarBuscar(producto: ProductoModel):Observable<any>{
    let direccion = this.UrlApp + 'listarBuscar';
    return this.http.post<any>(direccion,producto);
  }

}
