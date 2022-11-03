import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  registerForm: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder,
              private router: Router) {

    this.registerForm = this.fb.group({
      primerNombre: ['', Validators.required],
      segundoNombre: [''],
      primerApellido: ['',Validators.required],
      segundoApellido:[''],
      Genero:[''], //MASCULINO o FEMENINO
      Email:['',Validators.required, Validators.email],
      Username:['', Validators.required],
      Password:['', Validators.required],
      Perfil:['',Validators.required], //PUBLICO o PRIVADO
      Roll:['',Validators.required] //VENDEDOR,COMPRADOR,ADMINISTRADOR
      //imagen
    });
  }

  ngOnInit(): void {
  }

  Registrarse(){
    console.log(this.registerForm.value)
  }
  regresar(){
    this.router.navigateByUrl('/login')
  }
}
