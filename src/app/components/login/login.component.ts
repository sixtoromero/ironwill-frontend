import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService, ConfirmationService, Message } from 'primeng/api';
import { finalize } from 'rxjs/operators';
import { GeneralService } from 'src/app/services/general.service';
import { UsuarioModel } from '../../models/usuarios.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService, GeneralService, MessageService, ConfirmationService]
})
export class LoginComponent implements OnInit {

  displayRegisterUser: boolean = false;
  msgs: Message[] = [];

  public myForm: FormGroup  = new FormGroup({});

  iUser: UsuarioModel = new UsuarioModel();
  isNew: boolean = true;
  modeljson: UsuarioModel = new UsuarioModel();

  correo: string;
  clave: string;

  constructor(
    private fb: FormBuilder,    
    private ngxService: NgxUiLoaderService,
    private _service: UserService,
    private _general: GeneralService
  ) {
    this.myForm = fb.group({
      TipoDocumento: ['', [Validators.required]],
      Documento: ['', [Validators.required]],
      Nombres: ['', [Validators.required]],
      Apellidos: ['', [Validators.required]],
      Direccion: ['', [Validators.required]],
      Celular: ['', [Validators.required]],
      Correo: ['', [Validators.required]],
      Clave: ['', [Validators.required]],
      Genero: ['', [Validators.required]],
      Fecha_Nacimiento: ['', [Validators.required]]
    });
  }

  get f() {
    return this.myForm.controls;
  }  

  saveUser() {
    this.ngxService.start();
    const model = this.prepareSave();
    this.modeljson = model;
    this._service.insert(model)
    .pipe(finalize(() => this.ngxService.stop()))
    .subscribe(response => {
      if (response["IsSuccess"]) {
        this.clear();
        this._general.showSuccess('Registrado exitosamente');
      } else {        
        this._general.showError(`Ha ocurrido un error inesperado: ${response["Message"]}`);
      }
    }, error => {
      this._general.showError('Ha ocurrido un error inesperado.');
    });
  }

  login() {
    this.ngxService.start();    
    this._service.getUserByLogin(this.correo, this.clave)
    .pipe(finalize(() => this.ngxService.stop()))
    .subscribe(response => {
      if (response["IsSuccess"]) {        
        this._general.showSuccess('Listo para iniciar sesión');
        console.log(response["Data"]);
      } else {        
        this._general.showError(`Ha ocurrido un error inesperado: ${response["Message"]}`);
      }
    }, error => {
      this._general.showError('Usuario o clave incorrectos.');
    });
  }

  private prepareSave(): UsuarioModel {
    return new UsuarioModel().deserialize(this.myForm.value);
  }

  clear(){
    this.displayRegisterUser = false;
    this.isNew = false;
    this.myForm.reset();
  }

  ngOnInit(): void {
    
  }

}
