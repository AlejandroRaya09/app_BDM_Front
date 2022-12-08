import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CotizacionModel } from '../Models/CotizacionModel';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {
  UrlApp: string; 

  constructor(private http: HttpClient) {
    this.UrlApp = 'http://localhost/Proyectos/Back_Bdm_Php/controller/cotizacion.php?op=';
   }

   listarCotizacionesVendedor(id: CotizacionModel):Observable<any>{
    let direccion = this.UrlApp + 'listarCotizacionVendedor';
    return this.http.post<any>(direccion,id);
  }

  ofertar(cotizacion: CotizacionModel):Observable<any>{
    let direccion = this.UrlApp + 'Ofertar';
    return this.http.post<any>(direccion,cotizacion);
  }

  listarCotizacionesComprador(id: CotizacionModel):Observable<any>{
    let direccion = this.UrlApp + 'listarCotizacionComprador';
    return this.http.post<any>(direccion,id);
  }


  aceptarOferta(cotizacion: CotizacionModel):Observable<any>{
    let direccion = this.UrlApp + 'aceptarOferta';
    return this.http.post<any>(direccion,cotizacion);
  }

  negarOferta(cotizacion: CotizacionModel):Observable<any>{
    let direccion = this.UrlApp + 'negarOferta';
    return this.http.post<any>(direccion,cotizacion);
  }
}
