import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MarvelApiConfig } from '../configuration/marvelApiConfig';
import { HeroData } from '../models/heroData';

@Injectable({
  providedIn: 'root'
})
export class MarvelHeroesService {
  config = MarvelApiConfig.instance;
  count = 20;
  offSet = 0;

  constructor(private httpClient: HttpClient) { }

  async getHeroes(): Promise<HeroData[]> {
    const url = `${this.config.baseUrl}/characters?ts=1&apikey=${this.config.apiKey}&hash=${this.config.hash}`;
    const data: any = await this.httpClient.get(url, {responseType: 'json'}).toPromise();
    let result: HeroData[] = [];
    if(data.code == 200) {
      const serverHeroes: any[] = data.data.results;
      serverHeroes.forEach(h => {
        const heroInfo = new HeroData();
        heroInfo.id = h.id;
        heroInfo.name = h.name;
        heroInfo.description = h.description;
        heroInfo.resourceUrl = h.resourceURI;
        heroInfo.thumbnailUrl = `${h.thumbnail.path}/standard_small.jpg`;
        result.push(heroInfo);
      });
    }
    return Promise.resolve(result);
  }

  next() {
    this.offSet += this.count;
  }
  
  prev() {
    this.offSet -= this.count;
    if (this.offSet < 0) {
      this.offSet = 0;
    }
  }
}
