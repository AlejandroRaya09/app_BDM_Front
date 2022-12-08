import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompraVentaModel } from '../Models/CompraVentaModel';
import { UsuarioModel } from '../Models/UsuarioModel';

@Injectable({
  providedIn: 'root'
})
export class CompraVentaService {
  
  UrlApp: string; 

  constructor(private http: HttpClient) {
    this.UrlApp = 'http://localhost/Proyectos/Back_Bdm_Php/controller/compra_venta.php?op=';
   }


   
   CompraVenta(compra: CompraVentaModel):Observable<any>{
    let direccion = this.UrlApp + 'CompraVenta';
    return this.http.post<any>(direccion,compra);
  }

  listarVentas(id: UsuarioModel):Observable<any>{
    let direccion = this.UrlApp + 'listarVentas';
    return this.http.post<any>(direccion,id);
  }

  listarCompras(id: UsuarioModel):Observable<any>{
    let direccion = this.UrlApp + 'listarCompras';
    return this.http.post<any>(direccion,id);
  }

}
