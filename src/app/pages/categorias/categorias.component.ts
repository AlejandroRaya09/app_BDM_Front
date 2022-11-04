import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

const ELEMENT_DATA: string[] = [];

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent implements OnInit {
  displayedColumns: string[] = ['', '', '', ''];
  dataSource = ELEMENT_DATA;

  //FORMGROUP
  categoriaForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.categoriaForm = this.fb.group({
      Nombre:['',Validators.required],
      Descripcion:['', Validators.required]
    })
  }

  ngOnInit(): void {}
}
