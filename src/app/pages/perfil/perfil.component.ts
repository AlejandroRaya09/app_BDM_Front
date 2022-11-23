import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Genero, Roll, TipoPerfil } from 'src/app/Models/GenericosModel';
import { UsuarioModel } from '../../Models/UsuarioModel';
import { NgxToastService } from 'ngx-toast-notifier';
import { UsuarioService } from '../../Services/usuario.service';
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
    private notificaciones: NgxToastService,
    private usuarioService:UsuarioService) { 

    this.perfilForm = this.fb.group({
      primerNombre: ['', Validators.required],
      segundoNombre: [''],
      primerApellido: ['',Validators.required],
      segundoApellido:[''],
      Genero:['',Validators.required], //MASCULINO o FEMENINO
      Email:['',[Validators.required, Validators.email]],
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
      Id_Usuario:Number(sessionStorage.getItem('id_user')),
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
    this.usuarioService.editarUsuario(Perfil).subscribe((data) => {
      if (data[0].msg) {
        this.notificaciones.onDanger('Error', data[0].msg);
      } else {
        this.notificaciones.onSuccess('La edicion se completo satisfactoriamente','' );
      }
      this.listarDatosUsuario();
    });
}


  listarDatosUsuario(){
    const user: UsuarioModel = {
      Id_Usuario:Number(sessionStorage.getItem('id_user'))
    }
    this.usuarioService.ListarUserID(user).subscribe(data =>{
      this.perfilForm.get('primerNombre')?.setValue(data[0].P_Nombre);
      this.perfilForm.get('segundoNombre')?.setValue(data[0].S_Nombre);
      this.perfilForm.get('primerApellido')?.setValue(data[0].P_Apellido);
      this.perfilForm.get('segundoApellido')?.setValue(data[0].S_Apellido);
      this.perfilForm.get('Genero')?.setValue(data[0].Genero);
      this.perfilForm.get('Email')?.setValue(data[0].Correo);
      this.perfilForm.get('Username')?.setValue(data[0].Username);
      this.perfilForm.get('Password')?.setValue(data[0].Password);
      this.perfilForm.get('Perfil')?.setValue(data[0].TipoPerfil);
    })
  }
}
