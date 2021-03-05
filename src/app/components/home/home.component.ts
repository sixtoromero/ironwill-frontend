import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { finalize } from 'rxjs/operators';
import { GeneralService } from 'src/app/services/general.service';
import { UsuarioModel } from '../../models/usuarios.model';
import { Router } from '@angular/router';
import { AgendaService } from '../../services/agenda.service';
import { AgendaModel } from '../../models/agenda.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [GeneralService, MessageService, ConfirmationService]
})
export class HomeComponent implements OnInit {

  msgs: Message[] = [];
  user: UsuarioModel = new UsuarioModel();
  liagenda: AgendaModel[] = [];

  constructor(        
    private _general: GeneralService,    
    private confirmationService: ConfirmationService,
    private ngxService: NgxUiLoaderService,    
    private router: Router,
    private _service: AgendaService
  ) {     
    
    this.user = JSON.parse(localStorage.getItem('token_ironwill'));
    if (this.user === null) {
      this.router.navigate(['login']);
    }
    
  }  

  ngOnInit(): void {

  }

}
