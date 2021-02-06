import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  /**
   * Inyectamos el objeto del servicio para consumir el metodo para validar si el usuario esta logueado
   * o no y el Router para direccionar al usuario para que no pueda ingresar a ninguna otra pagina del sitio
   */
  constructor(private auth: AuthService,
              private router: Router) { }

  canActivate(): boolean {
    console.log('Guard');

    // Se valida si el usuario esta autenticado
    if (this.auth.estaAutenticado()) {
      return true; // Si esta autenticado, retorne simplemente verdadero
    } else {
      this.router.navigateByUrl('/login'); // Si no esta logueado, mediante el router se direccionar al usuario a la pagina de login
      return false;
    }
  }

}
