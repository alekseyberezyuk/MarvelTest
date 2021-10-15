import { Component, OnInit } from '@angular/core';
import { HeroData } from 'src/app/models/heroData';
import { MarvelHeroesService } from 'src/app/services/marvel-heroes.service';
import { HeroInfoComponent } from '../hero-info/hero-info.component';

@Component({
  selector: 'heroes-viewer',
  templateUrl: './heroes-viewer.component.html',
  styleUrls: ['./heroes-viewer.component.scss']
})
export class HeroesViewerComponent implements OnInit {
  heroesData: HeroData[];
  heroesDataCache: HeroData[];
  heroesPerPage = '20';
  searchParam = '';

  constructor(private heroesService: MarvelHeroesService) { }
  
  btnNextClicked() {
    if(this.heroesService.next()) {
      this.ngOnInit();
    }
  }

  btnPrevClicked() {
    if(this.heroesService.prev()) {
      this.ngOnInit();
    }
  }

  searchParamChanged() {
    const p = this.searchParam.toLocaleLowerCase();
    this.heroesData = this.heroesDataCache.filter(h => 
      h.name.toLocaleLowerCase().includes(p) || h.description.toLocaleLowerCase().includes(p)
    );
  }

  heroesPerPageChanged() {
    const heroesPerPageNumber = parseInt(this.heroesPerPage);
    this.heroesService.setHeroesPerPage(heroesPerPageNumber);
    this.ngOnInit();
  }

  async ngOnInit() {
    this.heroesData = await this.heroesService.getHeroes();
    this.heroesDataCache = this.heroesData;
  }
}
