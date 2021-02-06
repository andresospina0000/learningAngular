import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
    // this.usuario.email = 'andresospina0000@gmail.com';
  }

  // onSubmit() {
  onSubmit(form: NgForm) {

    /**
     * La siguiente validacion se encarga de capturar el estado del formulario, la cual, mediante las propiedades
     * definidas para los inputs del form, se puede saber si ya todos los campos del formulario fueron correctamente
     * o no diligenciados
     */
    if (form.invalid) { return; }

    Swal.fire({
      allowOutsideClick: false, // No permite que el usuario cierre la ventana por fuera del alert
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.auth.nuevoUsuario(this.usuario)
      .subscribe(respuesta => {
        console.log(respuesta);
        Swal.close();

        if (this.recordarme) {
          localStorage.setItem('email', this.usuario.email);
        }

        this.router.navigateByUrl('/home');
      }, (err) => {
        console.log(err.error.error.message);
        Swal.fire({
          icon: 'error',
          title: 'Error al autenticar',
          text: 'Ocurrio lo siguiente: ' + err.error.error.message
        });
      });


    // console.log('Formulario enviado');
    // console.log(this.usuario);
    // console.log(form);
  }

}
