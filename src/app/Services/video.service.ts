import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VideoModel } from '../Models/VideoModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  UrlApp: string; 

  constructor(private http: HttpClient) {
    this.UrlApp = 'http://localhost/Proyectos/Back_Bdm_Php/controller/video.php?op=';
   }


   agregarVideo(Video: File):Observable<any>{
    let direccion = this.UrlApp + 'agregarVideo';
    const formData = new FormData();
    formData.append('VideoPropia',Video,Video.name)
    return this.http.post<any>(direccion,formData);
  }

  agregarVideo_ID(Id:VideoModel):Observable<any>{
    let direccion = this.UrlApp + 'agregarVideo_ID';
    return this.http.post<any>(direccion,Id);
  }

}
