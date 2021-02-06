import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  // tslint:disable-next-line: variable-name
  constructor( private _heroesService: HeroesService, private router: Router ) { }

  ngOnInit() {
  }

  buscarHeroe(termino: string) {
    console.log(termino);
    this.router.navigate(['/heroeFilter', termino]);
  }

}
