import { HttpEventType, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { ResponseModel } from '../models/response.model';
import { Tipos_EjerciciosModel } from '../models/tipos_ejercicios.model';

const httpOptions = {
    headers: new HttpHeaders({
        'Contend-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root',
})
export class TipoEjerciciosService {

    endPoint = `${environment.apiURL}/Tipos_Ejercicios`;

    private usuarioSubject: BehaviorSubject<Tipos_EjerciciosModel>

    public get usuarioData(): Tipos_EjerciciosModel {
        return this.usuarioSubject.value;
    }

    constructor(private _http: HttpClient) { }
    

    insert(model: Tipos_EjerciciosModel): Observable<Observable<ResponseModel<string>>> {
        return this._http.post<Observable<ResponseModel<string>>>(`${this.endPoint}/InsertAsync`, model, httpOptions);
    }

    update(model: Tipos_EjerciciosModel): Observable<Observable<ResponseModel<string>>> {
        return this._http.put<Observable<ResponseModel<string>>>(`${this.endPoint}/UpdateAsync`, model, httpOptions);
    }

    delete(Id: number): Observable<Observable<ResponseModel<string>>> {
        return this._http.delete<Observable<ResponseModel<string>>>(`${this.endPoint}/DeleteAsync/${Id}`, httpOptions);
    }

    getAll(): Observable<Observable<ResponseModel<Tipos_EjerciciosModel[]>>> {
        return this._http.get<Observable<ResponseModel<Tipos_EjerciciosModel[]>>>(`${this.endPoint}/GetTipos_Ejercicios/`, httpOptions);
    }

}