import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  /** Para cerrar sesion se debe limpiar eliminar el token del locarlStarge y redireccionar 
   * a la pagina del login
   */
  salir() {
    this.auth.logOut();
    this.router.navigateByUrl('/login');
  }

}
