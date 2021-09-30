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
  totalHeroes;

  constructor(private httpClient: HttpClient) { }

  async getHeroes(): Promise<HeroData[]> {
    const url = `${this.config.baseUrl}/characters?ts=1&apikey=${this.config.apiKey}&hash=${this.config.hash}&offset=${this.offSet}`;
    const response: any = await this.httpClient.get(url, {responseType: 'json'}).toPromise();
    let result: HeroData[] = null;
    if(response.code == 200) {
      const serverHeroes: any[] = response.data.results;
      if(!this.totalHeroes) {
        this.totalHeroes = response.data.total;
      }
      result = serverHeroes.map(h => {
        const heroInfo = new HeroData();
        heroInfo.id = h.id;
        heroInfo.name = h.name;
        heroInfo.description = h.description;
        heroInfo.resourceUrl = h.resourceURI;
        heroInfo.thumbnailUrl = `${h.thumbnail.path}/standard_medium.jpg`;
        return heroInfo;
      });
    }
    return Promise.resolve(result);
  }

  next() {
    this.offSet += this.count;
    if(this.offSet >= this.totalHeroes) {
      this.offSet -= this.count;
      return false;
    }
    return true;
  }
  
  prev() {
    this.offSet -= this.count;
    if (this.offSet < 0) {
      this.offSet = 0;
      return false;
    }
    return true;
  }
}
