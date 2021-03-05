import { HttpEventType, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { ResponseModel } from '../models/response.model';
import { UsuarioModel } from '../models/usuarios.model';

const httpOptions = {
    headers: new HttpHeaders({
        'Contend-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root',
})
export class UserService {

    endPoint = `${environment.apiURL}/Usuarios`;

    private usuarioSubject: BehaviorSubject<UsuarioModel>

    public get usuarioData(): UsuarioModel {
        return this.usuarioSubject.value;
    }

    constructor(private _http: HttpClient) { }
    

    insert(model: UsuarioModel): Observable<Observable<ResponseModel<string>>> {
        return this._http.post<Observable<ResponseModel<string>>>(`${this.endPoint}/InsertAsync`, model, httpOptions);
    }

    update(model: UsuarioModel): Observable<Observable<ResponseModel<string>>> {
        return this._http.put<Observable<ResponseModel<string>>>(`${this.endPoint}/UpdateAsync`, model, httpOptions);
    }

    delete(Id: number): Observable<Observable<ResponseModel<string>>> {
        return this._http.delete<Observable<ResponseModel<string>>>(`${this.endPoint}/DeleteAsync/${Id}`, httpOptions);
    }

    getUserByLogin(correo: string, clave: string): Observable<Observable<ResponseModel<UsuarioModel>>> {
        return this._http.get<Observable<ResponseModel<UsuarioModel>>>(`${this.endPoint}/GetUserByLogin/${correo}/${clave}`, httpOptions);
    }

}