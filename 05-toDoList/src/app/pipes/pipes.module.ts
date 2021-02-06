import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroCompletadoPipe } from './filtro-completado.pipe';



@NgModule({
  declarations: [FiltroCompletadoPipe],
  exports: [ // Si se crean mas pipes, se deben importar aqui para poder utilizarlos en cualquier parte de la app
    FiltroCompletadoPipe
  ]
  // Se comentarea el import porq solo se va a crear un pipe
  // imports: [
  //   CommonModule
  // ]
})
export class PipesModule { }
