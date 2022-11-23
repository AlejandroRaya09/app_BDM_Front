export interface CategoriaModel {
  Id_Categoria?: number;
  NombreCatego?: string;
  DescripcionCatego?: string;
  Id_Usuario?: number;
  Estado?: string;
}


export interface CategoriaDetalleModel {
  Id_CategoriaDetalle?: number;
  Id_Categoria?: number;
  Id_Producto?: number;
  Estado?: string;
}
