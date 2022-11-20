import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Genero, Roll } from 'src/app/Models/GenericosModel';
import { TipoPerfil } from '../../Models/GenericosModel';
import { UsuarioModel } from '../../Models/UsuarioModel';
import { UsuarioService } from '../../Servicios/usuario.service';
import { NgxToastService } from 'ngx-toast-notifier';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  Genero: Genero[] = [{genero:'Masculino'}, {genero:'Femenino'}]
  TipoPerfil: TipoPerfil[] = [{tipo:'Publico'}, {tipo:'Privado'}]
  Roll: Roll[] = [{roll:'Vendedor'}, {roll:'Comprador'}, {roll:'Administrador'}]

  registerForm: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder,
              private router: Router,
              private usuarioService: UsuarioService,
              private notificaciones: NgxToastService) {

    this.registerForm = this.fb.group({
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
    });
  }

  ngOnInit(): void {
  }

  Registrarse(){
    if(this.registerForm.valid){
    const Registro: UsuarioModel = {
      P_Nombre:this.registerForm.value.primerNombre,
      S_Nombre:this.registerForm.value.segundoNombre || '',
      P_Apellido:this.registerForm.value.primerApellido,
      S_Apellido:this.registerForm.value.segundoApellido || '',
      Genero:this.registerForm.value.Genero,
      Correo:this.registerForm.value.Email,
      Username:this.registerForm.value.Username,
      Password:this.registerForm.value.Password,
      TipoPerfil:this.registerForm.value.Perfil,
      Roll:this.registerForm.value.Roll
    }
    this.usuarioService.agregarUsuarios(Registro).subscribe(data=>{
      console.log(data)
      if(data[0].msg){this.notificaciones.onDanger('Error', data[0].msg)}
      else{
        this.notificaciones.onSuccess('Correcto','Usuario creado satisfactoriamente')
        this.router.navigateByUrl('/login')
        this.notificaciones.onInfo('','Ingrese sus credenciales')
      }
      })
  }
  else{
    this.notificaciones.onWarning('Advertencia','LLENE TODOS LOS CAMPOS REQUERIDOS');
    this.registerForm.markAllAsTouched();
  }
}
  regresar(){
    this.router.navigateByUrl('/login')
  }
}
