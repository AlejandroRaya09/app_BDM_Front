import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TarjetaModel } from '../Models/TarjetaModel';


@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  UrlApp: string; 

  constructor(private http: HttpClient) {
    this.UrlApp = 'http://localhost/Proyectos/Back_Bdm_Php/controller/tarjetas.php?op=';
   }

   agregarTarjeta(tarjeta: TarjetaModel):Observable<any>{
    let direccion = this.UrlApp + 'agregarTarjeta';
    return this.http.post<any>(direccion,tarjeta);
  }

  editarTarjeta(tarjeta: TarjetaModel):Observable<any>{
    let direccion = this.UrlApp + 'editarTarjeta';
    return this.http.post<any>(direccion,tarjeta);
  }

  eliminarTarjeta(tarjeta: TarjetaModel):Observable<any>{
    let direccion = this.UrlApp + 'eliminarTarjeta';
    return this.http.post<any>(direccion,tarjeta);
  }

  listarTarjetas(tarjeta: TarjetaModel):Observable<any>{
    let direccion = this.UrlApp + 'listarTarjetas';
    return this.http.post<any>(direccion,tarjeta)
  }

  listarTarjetaID(tarjeta: TarjetaModel):Observable<any>{
    let direccion = this.UrlApp + 'listarTarjetaID';
    return this.http.post<any>(direccion,tarjeta);
  }

}
