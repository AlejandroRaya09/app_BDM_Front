import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrdenCompraModel } from '../Models/OrdenCompra';

@Injectable({
  providedIn: 'root'
})
export class OrdenCompraService {

  UrlApp: string; 

  constructor(private http: HttpClient) {
    this.UrlApp = 'http://localhost/Proyectos/Back_Bdm_Php/controller/ordencompra.php?op=';
   }


   agregarOrden(orden: OrdenCompraModel):Observable<any>{
    let direccion = this.UrlApp + 'OrdenCompra';
    return this.http.post<any>(direccion,orden);
  }

   
}
