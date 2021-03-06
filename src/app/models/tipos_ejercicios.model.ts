import { Deserializable } from './deserializable.model';

export class Tipos_EjerciciosModel implements Deserializable {
    public IdTipoEjercicio: number;
    public Ejercicio: number;
    public Fecha_Creacion: Date;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}