import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';
//import { ApiAuthService } from '../services/apiauth.service';
import { UserService } from '../services/user.service';

@Injectable({ providedIn: 'root'})
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private apiauthservice: UserService){}

    canActivate(route: ActivatedRouteSnapshot){
        
        const usuario = this.apiauthservice.usuarioData;
        if (usuario) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}