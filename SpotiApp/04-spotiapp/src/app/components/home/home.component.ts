import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { SpotifyService } from '../../services/spotify.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  nuevasCanciones: any[] = [];
  loading: boolean;
  error: boolean;
  msjError: string;

  constructor(private spotify: SpotifyService) {

    this.error = false;
    this.loading = true;
    this.spotify.getNewReleases().subscribe((data: any) => {
      // console.log(data.albums.items);
      // this.nuevasCanciones = data.albums.items;
      // tslint:disable-next-line: max-line-length
      this.nuevasCanciones = data; // Se hace comentario la linea de arriba porque con el objeto map se manejara la data como se necesita retornada
      this.loading = false;
    }, (errorServicio) => { // Asi se manejan los errores: token invalido, etc
      this.error = true;
      this.loading = false;
      this.msjError = errorServicio.error.error.message;
      // console.log(errorServicio.error.error.message);
    });
  }

  // paises: any [] = [];

  /**
   * De esta forma se inyecta una peticion HTTP - GET desde un servicio REST hasta Angular
   * se deja vacio el componente porque no va a ser la finalidad del modulo del curso
   */
  /*constructor(private http: HttpClient) {
    console.log('Constructor del Home');
    this.http.get('https://restcountries.eu/rest/v2/lang/es')
    .subscribe( (respuesta: any) => {
      this.paises = respuesta;
      console.log(respuesta);
    });
  }*/

  ngOnInit() {
  }

}
