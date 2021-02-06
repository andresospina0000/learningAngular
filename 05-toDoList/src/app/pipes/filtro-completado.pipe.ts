import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from '../models/lista.model';

@Pipe({
  name: 'filtroCompletado',
  pure: false // Al poner el pure en false cada vez q se dispare el filtro, va a refrescar las listas,
  // debido a que el pipe se va a disparar en el mismo componente
}) // Este pipe va a retornar solo las listas completadas
export class FiltroCompletadoPipe implements PipeTransform {

  transform(listas: Lista[], completada: boolean = true): Lista[] {

    return listas.filter(listasData => listasData.completada === completada);

  }

}
