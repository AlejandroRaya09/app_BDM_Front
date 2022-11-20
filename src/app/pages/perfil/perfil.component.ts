import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Genero, Roll, TipoPerfil } from 'src/app/Models/GenericosModel';
import { UsuarioModel } from '../../Models/UsuarioModel';
import { NgxToastService } from 'ngx-toast-notifier';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  
  Genero: Genero[] = [{genero:'Masculino'}, {genero:'Femenino'}]
  TipoPerfil: TipoPerfil[] = [{tipo:'Publico'}, {tipo:'Privado'}]
  Roll: Roll[] = [{roll:'Vendedor'}, {roll:'Comprador'}, {roll:'Administrador'}]
  
  perfilForm: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder,
    private notificaciones: NgxToastService,) { 

    this.perfilForm = this.fb.group({
      primerNombre: ['', Validators.required],
      segundoNombre: [''],
      primerApellido: ['',Validators.required],
      segundoApellido:[''],
      Genero:['',Validators.required], //MASCULINO o FEMENINO
      Email:['',Validators.required, Validators.email],
      Username:['', Validators.required],
      Password:['', Validators.required],
      Perfil:['',Validators.required], //PUBLICO o PRIVADO
      Roll:['',Validators.required] //VENDEDOR,COMPRADOR,ADMINISTRADOR
      //imagen
    });
    
  }

  ngOnInit(): void {
    this.listarDatosUsuario();
  }


  EditarDatos(){
    const Perfil: UsuarioModel = {
      P_Nombre: this.perfilForm.value.primerNombre,
      S_Nombre: this.perfilForm.value.segundoNombre || '',
      P_Apellido: this.perfilForm.value.primerApellido,
      S_Apellido: this.perfilForm.value.segundoApellido || '',
      Genero: this.perfilForm.value.Genero,
      Correo: this.perfilForm.value.Email,
      Username:this.perfilForm.value.Username,
      Password:this.perfilForm.value.Password,
      Roll:this.perfilForm.value.Roll,
      TipoPerfil:this.perfilForm.value.Perfil
      //FALTA LA IMAGEN 
    }
    //LLAMAR API PARA EDITAR DATOS DE USUARIO
  }


  listarDatosUsuario(){
    //listar Datos Usuario 
  }
}
