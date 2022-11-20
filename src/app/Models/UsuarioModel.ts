export interface UsuarioModel {
    Id_Usuario?: number;
    P_Nombre?: string;
    S_Nombre?: string;
    P_Apellido?: string;
    S_Apellido?: string;
    Genero?: string; //('Masculino', 'Femenino')

    Correo?: string;
    Username?: string;
    Password?: string;
    Roll?:string; //('VENDEDOR','COMPRADOR','ADMINISTRADOR')
    TipoPerfil?: string; //('Publico','Privado')
 //   Imagen
    Estado?: string; //('Activo', 'Inactivo')

    pOpcion?: string;
}