import { Component } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  listas: Lista[];

  constructor(public deseosService: DeseosService, private router: Router, public alertController: AlertController) {
    this.listas = deseosService.getListas();
    // this.agregarLista()
  }

  /** La palabra reservada asyn convierte el metodo en una promesa */
  async agregarLista() {

    const alert = await this.alertController.create({
      header: 'Nueva lista',
      inputs: [
        {
          name: 'titulo', // nombre que va a retonar el titulo
          type: 'text', //
          placeholder: 'Nombre de la lista' // valor por default
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
          }
        },
        {
          text: 'Crear',
          handler: (data) => {
            console.log(data);
            if (data.titulo.length === 0) {
              return;
            }
            /** Crear la lista si no es cero */
            const listaId = this.deseosService.crearLista(data.titulo);
            this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);
          }
        }
      ]
    });
    alert.present();
  }

  // listaSeleccionada(lista: Lista) {
  //   // console.log(lista);
  //   this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
  // }

}
