import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng';
import { GeneralService } from 'src/app/services/general.service';
import { AgendaModel } from '../../../models/agenda.model';
import { Router } from '@angular/router';
import { AgendaService } from 'src/app/services/agenda.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { finalize } from 'rxjs/operators';
import { UsuarioModel } from 'src/app/models/usuarios.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoEjerciciosService } from '../../../services/tipoejercicios.service';
import { Tipos_EjerciciosModel } from '../../../models/tipos_ejercicios.model';

@Component({
  selector: 'app-history-athlete',
  templateUrl: './history-athlete.component.html',
  styleUrls: ['./history-athlete.component.scss']
})
export class HistoryAthleteComponent implements OnInit {

  listHistory: AgendaModel[] = [];
  liTiposDep: Tipos_EjerciciosModel[] = [];

  iHistory: AgendaModel = new AgendaModel();

  displayRegisterAgenda: boolean;

  @Input() user: UsuarioModel = new UsuarioModel();  

  public myForm: FormGroup  = new FormGroup({});

  iAgenda: AgendaModel = new AgendaModel();

  
  constructor(
    private fb: FormBuilder,
    private _general: GeneralService,    
    private confirmationService: ConfirmationService,
    private ngxService: NgxUiLoaderService,
    private router: Router,
    private _service: AgendaService,
    private _tipoEjercicios: TipoEjerciciosService
  ) {
    
    this.myForm = fb.group({
      IdTipoEjercicio: ['', [Validators.required]],
      Fecha: ['', [Validators.required]],
      Hora: ['', [Validators.required]]      
    });
    
  }

  ngOnInit(): void {    
    this.getHistoryAthlete();
    this.getTiposEjercicios();
  }

  get f() {
    return this.myForm.controls;
  }

  getHistoryAthlete() {        
    this.ngxService.start();
    this._service.getHistoryAthlete(this.user.IdUsuario)
    .pipe(finalize(() => this.ngxService.stop()))
    .subscribe(response => {
      if (response["IsSuccess"]) {
        this.listHistory = response["Data"] as AgendaModel[];
      }
    }, error => {
      this._general.showError('Ha ocurrido un error inesperado.');
    });
  }


  getTiposEjercicios() {        
    this.ngxService.start();
    this._tipoEjercicios.getAll()
    .pipe(finalize(() => this.ngxService.stop()))
    .subscribe(response => {
      if (response["IsSuccess"]) {
        this.liTiposDep = response["Data"] as Tipos_EjerciciosModel[];
      }
    }, error => {
      this._general.showError('Ha ocurrido un error inesperado.');
    });
  }

  insert() {
    this.ngxService.start();
    this.iAgenda = this.prepareSave();
    this.iAgenda.IdUsuario = this.user.IdUsuario;
    this._service.insert(this.iAgenda)
    .pipe(finalize(() => this.ngxService.stop()))
    .subscribe(response => {
      if (response["IsSuccess"]) {        
        this._general.showSuccess('Registrado exitosamente');
        this.getHistoryAthlete();
        this.displayRegisterAgenda = false;
        this.myForm.reset();
      } else {        
        this._general.showError(`Ha ocurrido un error inesperado: ${response["Message"]}`);
      }
    }, error => {
      this._general.showError('Ha ocurrido un error inesperado.');
    });
  }

  private prepareSave(): AgendaModel {
    return new AgendaModel().deserialize(this.myForm.value);
  }

  

}
