import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DomicilioModel } from '../Models/DomicilioModel';


@Injectable({
  providedIn: 'root'
})
export class DomicilioService {

  UrlApp: string; 

  constructor(private http: HttpClient) {
    this.UrlApp = 'http://localhost/Proyectos/Back_Bdm_Php/controller/domicilios.php?op=';
   }

   agregarDomicilio(domicilio: DomicilioModel):Observable<any>{
    let direccion = this.UrlApp + 'agregarDomicilio';
    return this.http.post<any>(direccion,domicilio);
  }

  editarDomicilio(domicilio: DomicilioModel):Observable<any>{
    let direccion = this.UrlApp + 'editarDomicilio';
    return this.http.post<any>(direccion,domicilio);
  }

  eliminarDomicilio(domicilio: DomicilioModel):Observable<any>{
    let direccion = this.UrlApp + 'eliminarDomicilio';
    return this.http.post<any>(direccion,domicilio);
  }

  listarDomicilios(domicilio: DomicilioModel):Observable<any>{
    let direccion = this.UrlApp + 'listarDomicilios';
    return this.http.post<any>(direccion,domicilio)
  }

  listarDomiciliosID(domicilio: DomicilioModel):Observable<any>{
    let direccion = this.UrlApp + 'listarDomiciliosID';
    return this.http.post<any>(direccion,domicilio);
  }


}
