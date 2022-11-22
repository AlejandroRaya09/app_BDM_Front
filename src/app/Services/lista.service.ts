import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { Observable } from 'rxjs';
import { ListaModel } from '../Models/ListaModel';

@Injectable({
  providedIn: 'root'
})
export class ListaService {
  UrlApp: string; 

  constructor(private http: HttpClient) {
    this.UrlApp = 'http://localhost/Proyectos/Back_Bdm_Php/controller/listas.php?op=';
   }


   agregarLista(lista: ListaModel):Observable<any>{
    let direccion = this.UrlApp + 'agregarLista';
    return this.http.post<any>(direccion,lista);
  }

  editarLista(lista: ListaModel):Observable<any>{
    let direccion = this.UrlApp + 'editarLista';
    return this.http.post<any>(direccion,lista);
  }

  eliminarLista(lista: ListaModel):Observable<any>{
    let direccion = this.UrlApp + 'eliminarLista';
    return this.http.post<any>(direccion,lista);
  }

  listaAllListas(lista: ListaModel):Observable<any>{
    let direccion = this.UrlApp + 'listarAllListas';
    return this.http.post<any>(direccion,lista)
  }

  listarIDLista(lista: ListaModel):Observable<any>{
    let direccion = this.UrlApp + 'listarListaID';
    return this.http.post<any>(direccion,lista);
  }

}
