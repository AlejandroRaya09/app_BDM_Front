import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder,
              private router: Router) {
    this.loginForm = this.fb.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  ingresar() {
    console.log(this.loginForm.value);
    this.router.navigateByUrl('/')
  }
  
  registrarse(){
    this.router.navigateByUrl('/register')
  }

  /* 
 campoInvalido( campo: string){
    return this.loginForm.controls[campo].errors 
            && this.loginForm.controls[campo].touched
          }*/
}
