import { Deserializable } from './deserializable.model';

export class UsuarioModel implements Deserializable {

    public IdUsuario: number;
    public TipoDocumento: string;
    public Documento: string;
    public Nombres: string;
    public Apellidos: string;
    public Direccion: string;
    public Celular: string;
    public Correo: string;
    public Clave: string;
    public Genero: string;
    public Fecha_Nacimiento: Date;
    public Estado: boolean;
    public Fecha_Creacion: Date;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}