export interface ListaModel {
    Id_Lista?: number;
    NombreLista?: string;
    DescripcionLista?: string,
    Id_Usuario?: number;
    tipoLista?: string;
    Estado?: string;
  }
  

  export interface ListaDetalleModel {
    Id_Lista_Detalle?: number;
    Id_Lista?: number;
    Id_Producto?: number
  }
  

  