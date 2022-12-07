import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarritoService } from '../../Services/carrito.service';
import { CarritoModel } from '../../Models/CarritoModel';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  constructor(public dialogref: MatDialogRef<CarritoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private carritoService:CarritoService) { }

  ngOnInit(): void {
    this.verProductosCarrito()
  }
  
  carritoGeneral:any;
  carritoProductos:any;

  verProductosCarrito(){
    const carritoModel:CarritoModel = {
      Id_Usuario: Number(sessionStorage.getItem('id_user'))
    }
    this.carritoService.listarCarrito(carritoModel).subscribe(data=>{
      this.carritoGeneral = data;
      console.log(this.carritoGeneral)

      const carritoModel:CarritoModel = {
        Id_Carrito: Number(sessionStorage.getItem('Id_Carrito'))
      }
      this.carritoService.listarCarritoCompleto(carritoModel).subscribe(data=>{
        this.carritoProductos = data;
        console.log(this.carritoProductos)
      })
    })


  }


  cerrar(){
    this.dialogref.close();
  }

}
