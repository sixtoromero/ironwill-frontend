import { Deserializable } from './deserializable.model';

export class AgendaModel implements Deserializable {    
    public IdAgenda: number;
    public IdTipoEjercicio: number;    
    public Fecha: Date;
    public Hora: string;
    public Fecha_Creacion: Date;

    public Deportista: string;
    public Ejercicio: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}