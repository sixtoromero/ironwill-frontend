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

@Component({
  selector: 'app-history-athlete',
  templateUrl: './history-athlete.component.html',
  styleUrls: ['./history-athlete.component.scss']
})
export class HistoryAthleteComponent implements OnInit {

  listHistory: AgendaModel[] = [];
  iHistory: AgendaModel = new AgendaModel();

  displayRegisterAgenda: boolean;

  @Input() user: UsuarioModel = new UsuarioModel();  

  public myForm: FormGroup  = new FormGroup({});
  
  constructor(
    private fb: FormBuilder,
    private _general: GeneralService,    
    private confirmationService: ConfirmationService,
    private ngxService: NgxUiLoaderService,
    private router: Router,
    private _service: AgendaService
  ) {
    
    this.myForm = fb.group({
      IdTipoEjercicio: ['', [Validators.required]],
      Fecha: ['', [Validators.required]],
      Hora: ['', [Validators.required]]      
    });
    
  }

  ngOnInit(): void {    
    this.getHistoryAthlete();
  }



  get f() {
    return this.myForm.controls;
  }

  getHistoryAthlete() {        
    this.ngxService.start();
    this._service.getHistoryAthlete(this.user.IdPerfil)
    .pipe(finalize(() => this.ngxService.stop()))
    .subscribe(response => {
      if (response["IsSuccess"]) {
        this.listHistory = response["Data"] as AgendaModel[];
      }
    }, error => {
      this._general.showError('Ha ocurrido un error inesperado.');
    });
  }

}
