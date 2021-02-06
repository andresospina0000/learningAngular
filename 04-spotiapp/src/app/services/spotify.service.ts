import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';


/**
 * El decorador le dice a angular que se va a poder inyctar en cualquier lugar
 * La diferencia es q con el decorador se va a poder crear una unica instancia en toda la app
 * El utilizar este decorador, no hay necesidad de realizar el import en el app.module.ts. Si el decorador no se pone,
 * si es necesario hacer el import
 */
@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
    console.log('Spotify Service listo');
  }

  getQuery(query: string) {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQA0QL95PhOc2h3RoGFfJNLWVN_toAtrwLcJk_28q79Gcg0YB5slFxdcNMESVlOJ_cAYoDRVXr-3aK0RHio'
    });

    const url = `https://api.spotify.com/v1/${query}`;
    console.log('URL LLAMADO: ' + url);

    return this.http.get(url, { headers });
  }

  getNewReleases() {

    /** Se modifica el header de la peticion como se hizo en el POSTMAN, ya que es requerido el Token
     * que pide Spotify
     */
    /*const headers = new HttpHeaders({
      'Authorization': 'Bearer BQCicdC-GDfbGB6nYpd2oZkpXZGZ84gn-xbRrYu9dJ5v70dnuMiJptAD05QsHwOYydf8PIO3UR9H8KZ4qBA'
    });*/

    /** Asi se hace la peticion GET al Web API de spotify 
     * Con el endpoint asi: https://api.spotify.com/v1/browse/new-releases, trae los primeros 20 albumes mas recientes
     * Con el endpoint asi: https://api.spotify.com/v1/browse/new-releases?limit=5, trae los primeros 20 albumes mas recientes
    */
    // return this.http.get('	https://api.spotify.com/v1/browse/new-releases', { headers });

    /* this.http.get('https://api.spotify.com/v1/browse/new-releases', { headers })
      .pipe(map(data => {
        return data['albums'].items; // El poner las llaves le dice a la funcion que busque una propiedad en el objeto con el nombre "albums"
      })); */ // Esta es una forma mas larga de retornar la data
    /*.subscribe(data => {
      console.log(data);
    });*/
    /** Todo el codigo del metodo se reduce esta linea gracias al metodo getQuery */
    return this.getQuery('browse/new-releases?limit=20').pipe(map(data => data['albums'].items));
  }

  getArtistas(termino: string) {
    /*const headers = new HttpHeaders({
      'Authorization': 'Bearer BQCicdC-GDfbGB6nYpd2oZkpXZGZ84gn-xbRrYu9dJ5v70dnuMiJptAD05QsHwOYydf8PIO3UR9H8KZ4qBA'
    });

    return this.http.get(`https://api.spotify.com/v1/search?q=${termino}&type=artist&limit=15`, { headers })
      .pipe(map(data => data['artists'].items)); */ // Es una forma mas simplificada de retornar la respuesta
    // console.log(termino);
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`).pipe(map(data => data['artists'].items));
  }

  getArtista(id: string) {
    return this.getQuery(`artists/${id}`); // .pipe(map(data => data['artist'].items));
  }

  getTopTracks(id: string) {
    // return this.getQuery(`artists/${id}/top-tracks?country=US`);
    return this.getQuery(`artists/${id}/top-tracks?country=US`).pipe(map(data => data['tracks']));
  }
}
