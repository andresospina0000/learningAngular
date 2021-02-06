import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Pipe({
  name: 'domseguro'
})
export class DomseguroPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) { }

  /**
 * Se modifico el pipe dejando constante la URL de spotify para q solo concatene el URI enviado
 * desde la pagina del artista
 */
  transform(value: string): any {

    const url = 'https://open.spotify.com/embed?uri=';

    return this.domSanitizer.bypassSecurityTrustResourceUrl(url + value);
  }

}
