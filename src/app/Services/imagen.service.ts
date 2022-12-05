import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImagenModel } from '../Models/ImagenModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {


  UrlApp: string; 

  constructor(private http: HttpClient) {
    this.UrlApp = 'http://localhost/Proyectos/Back_Bdm_Php/controller/imagen.php?op=';
   }


   agregarImagen(Imagen: File):Observable<any>{
    let direccion = this.UrlApp + 'agregarImagen';
    const formData = new FormData();
    formData.append('imagenPropia',Imagen,Imagen.name)
    return this.http.post<any>(direccion,formData);


  }
}
