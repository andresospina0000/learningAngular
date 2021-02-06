import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroeComponent } from './components/heroe/heroe.component';
import { HeroeFilterComponent } from './components/heroes/heroe-filter/heroe-filter.component';

const ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'heroes', component: HeroesComponent },
    { path: 'heroe/:id', component: HeroeComponent }, // Para asar por parametro el id del hereo
    { path: 'heroeFilter/:termino', component: HeroeFilterComponent }, // Para asar por parametro 'termino' del hereo
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

// export const APP_ROUTING = RouterModule.forRoot(ROUTES,{useHash : true}); // Mas deficiente el uso del hash o #
export const APP_ROUTING = RouterModule.forRoot(ROUTES);
