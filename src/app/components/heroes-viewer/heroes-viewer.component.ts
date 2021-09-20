import { Component, OnInit } from '@angular/core';
import { MarvelHeroesService } from 'src/app/services/marvel-heroes.service';
import { HeroInfoComponent } from '../hero-info/hero-info.component';

@Component({
  selector: 'heroes-viewer',
  templateUrl: './heroes-viewer.component.html',
  styleUrls: ['./heroes-viewer.component.scss']
})
export class HeroesViewerComponent implements OnInit {
  heroesData: HeroInfoComponent[];

  constructor(private heroesService: MarvelHeroesService) { }

  ngOnInit(): void {
    this.heroesService.getHeroes();
  }

}
