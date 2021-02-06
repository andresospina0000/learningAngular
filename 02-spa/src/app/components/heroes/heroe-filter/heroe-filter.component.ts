import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroesService, Heroe } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe-filter',
  templateUrl: './heroe-filter.component.html'
})
export class HeroeFilterComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private heroeService: HeroesService) {

  }

  heroesArr: Heroe[] = [];

  ngOnInit() {

    this.activatedRoute.params.subscribe( params => {
      console.log(params.termino);
      this.heroesArr = this.heroeService.buscarHeroes(params.termino);
      console.log(this.heroesArr);
      // this.setImageHeroe(this.heroe);
    });
  }

}
