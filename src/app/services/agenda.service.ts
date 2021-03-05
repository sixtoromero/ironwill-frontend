import { HttpEventType, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { ResponseModel } from '../models/response.model';
//import { AgendaModel } from '../models/usuarios.model';
import { AgendaModel } from '../models/agenda.model';

const httpOptions = {
    headers: new HttpHeaders({
        'Contend-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root',
})
export class AgendaService {

    endPoint = `${environment.apiURL}/Agenda`;

    private usuarioSubject: BehaviorSubject<AgendaModel>

    public get usuarioData(): AgendaModel {
        return this.usuarioSubject.value;
    }

    constructor(private _http: HttpClient) { }
    

    insert(model: AgendaModel): Observable<Observable<ResponseModel<string>>> {
        return this._http.post<Observable<ResponseModel<string>>>(`${this.endPoint}/InsertAsync`, model, httpOptions);
    }

    update(model: AgendaModel): Observable<Observable<ResponseModel<string>>> {
        return this._http.put<Observable<ResponseModel<string>>>(`${this.endPoint}/UpdateAsync`, model, httpOptions);
    }

    delete(Id: number): Observable<Observable<ResponseModel<string>>> {
        return this._http.delete<Observable<ResponseModel<string>>>(`${this.endPoint}/DeleteAsync/${Id}`, httpOptions);
    }

    getHistoryAthlete(IdUsuario: number): Observable<Observable<ResponseModel<AgendaModel[]>>> {
        return this._http.get<Observable<ResponseModel<AgendaModel[]>>>(`${this.endPoint}/getHistoryAthlete/${IdUsuario}`, httpOptions);
    }

}