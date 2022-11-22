import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioModel } from '../Models/UsuarioModel';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

 UrlApp: string; 

  constructor(private http: HttpClient) { 
    this.UrlApp = 'http://localhost/Proyectos/Back_Bdm_Php/controller/usuario.php?op=';
  }

  
  validarLogin(credenciales: UsuarioModel):Observable<any>{
    let direccion = this.UrlApp + 'validarLogin';
    return this.http.post(direccion,credenciales);
  }

  agregarUsuarios(usuario: UsuarioModel):Observable<any>{
    let direccion = this.UrlApp + 'registrarUsuario';
    return this.http.post<any>(direccion,usuario);
  }


}
