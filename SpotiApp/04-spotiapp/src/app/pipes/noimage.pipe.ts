import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimage'
})
export class NoimagePipe implements PipeTransform {

  transform(images: any[], ...args: any[]): string {

    if (!images) {
      return 'assets/img/noimage.png'; // Recordar que la ruta se cuenta desde el index.html (contiene la app completa)
    }

    if (images.length > 0) {
      return images[0].url;
    } else {
      return 'assets/img/noimage.png';
    }

    return null;
  }

}
