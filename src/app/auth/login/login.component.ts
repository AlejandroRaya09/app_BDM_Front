
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from '../../Models/UsuarioModel';
import { UsuarioService } from '../../Servicios/usuario.service';
import { NgxToastService } from 'ngx-toast-notifier';
import { TipoPerfil } from '../../Models/GenericosModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder,
              private router: Router,
              private notificaciones: NgxToastService,
              private UserService: UsuarioService) {
    this.loginForm = this.fb.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  ingresar() {
    if(this.loginForm.valid){
    const Credenciales: UsuarioModel = {
      Username: this.loginForm.value.Username,
      Password: this.loginForm.value.Password
    }
    this.UserService.validarLogin(Credenciales).subscribe(data=>{
      if(data == 'Usuario no existe! Corregir Password o Username'){
        this.notificaciones.onDanger('Error',data);
        this.loginForm.reset();
      }else{
        let nombreCompleto:string = data[0].P_Nombre + ' ' +  data[0].S_Nombre + ' ' + data[0].P_Apellido + ' ' +data[0].S_Apellido
        this.notificaciones.onSuccess('Bienvenido', nombreCompleto);
        this.router.navigateByUrl('/dashboard')
        sessionStorage.setItem('id_user', data[0].Id_Usuario)
        sessionStorage.setItem('username', data[0].Username)
        sessionStorage.setItem('roll', data[0].Roll)
      }
    })
  }else{
    this.notificaciones.onWarning('Advertencia','LLENE TODOS LOS CAMPOS REQUERIDOS');
    this.loginForm.markAllAsTouched();
  }
  }
  registrarse(){
    this.router.navigateByUrl('/register')
  }

}
