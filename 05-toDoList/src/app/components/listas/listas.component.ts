import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {


  listas: Lista[];

  // Esto busca un elemento en el html como IonLIst
  @ViewChild(IonList, { static: true }) lista: IonList;
  @Input() terminada = true;

  constructor(public deseosService: DeseosService, private router: Router, public alertController: AlertController) {
    /* Se pone en comentario esta linea debido a que al crear la instancia del componente, persiste en la vista
    el valor de las listas y no se refresca el objeto ni la vista
    */
    // this.listas = deseosService.getListas();
  }

  ngOnInit() { }

  listaSeleccionada(lista: Lista) {
    // console.log(lista);
    if (this.terminada) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }
  }

  borrarList(lista: Lista) {
    console.log(lista);
    this.deseosService.borrarLista(lista);
  }

  /**
   * Esta funcion se pudo centralizar en un servicio porque se hizo un copy/paste
   */
  async editarLista(lista: Lista) {

    const alert = await this.alertController.create({
      header: 'Editar Titulo Lista',
      inputs: [
        {
          name: 'titulo', // nombre que va a retonar el titulo
          type: 'text', //
          // placeholder: lista.titulo // valor por default
          value: lista.titulo
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar edicion.');
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Guardar',
          handler: (data) => {
            console.log(data);
            if (data.titulo.length === 0) {
              return;
            }
            lista.titulo = data.titulo;
            // console.log('Titulo: ' + data.titulo);
            this.deseosService.guardarStorage();
            this.lista.closeSlidingItems();
          }
        }
      ]
    });
    alert.present();
  }
}
