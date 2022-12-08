export interface CarritoModel {
Id_Carrito?: number;
PrecioTotal?: number;
Cant_Produc?: number;
Id_Usuario?: number;
}


export interface CarritoDetalleModel {
    Id_CarritoDetalle?: number;
    Id_Producto? : number;
    Cantidad?: number;
    Precio?: number; 
    PrecioTotal?: number;
    Id_Carrito?: number;
    Estado?:string;

    Id_Usuario?: number;
}