import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListasComponent } from './listas/listas.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    ListasComponent
  ],
  exports: [
    // Los exports se utilizan para poder utilizar desde otro modulo los componentes aqui implementados
    ListasComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule // Se importa el modulo del piep que va a filtrar las listas completadas
  ]
})
export class ComponentsModule { }
