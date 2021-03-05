import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
//import { ApiAuthService } from '../services/apiauth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    
    constructor(private apiauthService: UserService){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const usuario = this.apiauthService.usuarioData;
        if (usuario) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${usuario.token}`
                }
            });
        }

        return next.handle(request);
    }
}
