import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroesService, Heroe } from '../services/heroes.service';
import { ReturnStatement } from '@angular/compiler';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html'
})
export class HeroeComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private heroeService: HeroesService) {

    this.activatedRoute.params.subscribe( params => {
      this.heroe = this.heroeService.getHeroe( params.id);
      console.log(this.heroe);
      // this.setImageHeroe(this.heroe);
    });

  }

// heroe: any = {};
heroe: Heroe;

  imgCasa: string;

  ngOnInit() {
   // this.setImageHeroe(this.heroe);
  }

  // tslint:disable-next-line: variable-name
  setImageHeroe(_heroe: Heroe) {

    const IMG_DC = '/assets/img/dc_logo.jpg';
    const IMG_MARVEL = '/assets/img/marvel_logo.jpg';
    // console.log(_heroe.casa);
    if (_heroe.casa === 'DC' ) {
      console.log('Entro a DC');
      return this.imgCasa = IMG_DC;
    } else {
      console.log('Entro a Marvel');
      return this.imgCasa = IMG_MARVEL;
    }


  }

}
