import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CarritoModel } from '../Models/CarritoModel';
import { CarritoDetalleModel } from '../Models/CarritoModel';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  UrlApp: string; 

  constructor(private http: HttpClient) {
    this.UrlApp = 'http://localhost/Proyectos/Back_Bdm_Php/controller/carrito.php?op=';
   }

   listarCarrito(Id: CarritoModel):Observable<any>{
    let direccion = this.UrlApp + 'listarCarrito';
    return this.http.post<any>(direccion,Id);
  }

  agregarProductoCarrito ( producto: CarritoDetalleModel):Observable<any>{
    let direccion = this.UrlApp + 'agregarProductoCarrito';
    return this.http.post<any>(direccion,producto);
  }

  listarCarritoCompleto(Id: CarritoModel):Observable<any>{
    let direccion = this.UrlApp + 'ListarCarritoCompleto';
    return this.http.post<any>(direccion,Id);
  }

  EliminarProducto ( producto: CarritoDetalleModel):Observable<any>{
    let direccion = this.UrlApp + 'EliminarProducto';
    return this.http.post<any>(direccion,producto);
  }

  
  quitarExitenciaProducto ( producto: CarritoDetalleModel):Observable<any>{
    let direccion = this.UrlApp + 'quitarExitenciaProducto';
    return this.http.post<any>(direccion,producto);
  }

  
  agregarExitenciaProducto ( producto: CarritoDetalleModel):Observable<any>{
    let direccion = this.UrlApp + 'agregarExitenciaProducto';
    return this.http.post<any>(direccion,producto);
  }
}
