import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { finalize } from 'rxjs/operators';
import { ClienteModel } from 'src/app/models/cliente.model';
import { TotalesByCamareroModel } from 'src/app/models/totalesbycamarero.model';
import { BillService } from 'src/app/services/bill.service';
import { CustomerService } from 'src/app/services/customer.service';
import { GeneralService } from 'src/app/services/general.service';
import { UsuarioModel } from '../../models/usuarios.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [GeneralService, MessageService, ConfirmationService]
})
export class HomeComponent implements OnInit {

  msgs: Message[] = [];
  user: UsuarioModel = new UsuarioModel();

  constructor(        
    private _general: GeneralService,    
    private confirmationService: ConfirmationService,
    private ngxService: NgxUiLoaderService,
    private router: Router
  ) { 

    debugger;
    this.user = JSON.parse(localStorage.getItem('token_ironwill'));
    if (this.user === null) {
      this.router.navigate(['login']);
    }
  }

  ngOnInit(): void {

  }

}
