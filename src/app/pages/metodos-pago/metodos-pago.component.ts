
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomicilioModel } from 'src/app/Models/DomicilioModel';
import { TarjetaModel } from '../../Models/TarjetaModel';

@Component({
  selector: 'app-metodos-pago',
  templateUrl: './metodos-pago.component.html',
  styleUrls: ['./metodos-pago.component.css']
})
export class MetodosPagoComponent implements OnInit {

    //FORMGROUP
    tarjetaForm: FormGroup;
    domicilioForm: FormGroup;

  constructor(private fb: FormBuilder) { 
    this.domicilioForm = this.fb.group({
      Calle: ['', Validators.required],
      Numero: [,Validators.required],
      Colonia: ['', Validators.required],
      Cp: [, Validators.required],
      Municipio: ['', Validators.required],
      Estado:['', Validators.required]
    })

    this.tarjetaForm = this.fb.group({
      Num_Tarjeta: [,Validators.required],
      Nomb_Tarjeta: ['', Validators.required],
      Banco: ['', Validators.required],
      Caducidad: ['', Validators.required]
    })
  }


  agregar_editarDomicilio(){
    const Domicilio: DomicilioModel = {
      Calle: this.domicilioForm.value.Calle,
      Numero: this.domicilioForm.value.Numero,
      Colonia: this.domicilioForm.value.Colonia,
      Cp: this.domicilioForm.value.Cp,
      Estado: this.domicilioForm.value.Estado,
      Municipio: this.domicilioForm.value.Municipio, 
      Id_Usuario: 1 //CAMBIAR
    }
    console.log(Domicilio)
  }

  agregar_editarTarjeta(){
    const Tarjeta: TarjetaModel = {
      Num_Tarjeta: this.tarjetaForm.value.Num_Tarjeta,
      Nom_Tarjeta: this.tarjetaForm.value.Nom_Tarjeta, 
      Banco: this.tarjetaForm.value.Banco, 
      Caducidad: this.tarjetaForm.value.Caducidad, 
      Id_Usuario: 1 //CAMBIAR
    }
    console.log(Tarjeta)
  }

  ngOnInit(): void {
    this.listarDomicilios();
    this.listarTarjetas();
  }


  listarDomicilios(){
    //LISTAR DOMICILIOS
  }
  listarTarjetas(){
    //LISTAR TARJETAS
  }
}
