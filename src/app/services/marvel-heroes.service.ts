import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroInfoComponent } from '../components/hero-info/hero-info.component';
import { MarvelApiConfig } from '../configuration/marvelApiConfig';

@Injectable({
  providedIn: 'root'
})
export class MarvelHeroesService {
  config = MarvelApiConfig.instance;
  count = 20;
  offSet = 0;

  constructor(private httpClient: HttpClient) { }

  async getHeroes(): Promise<HeroInfoComponent[]> {
    const url = `${this.config.baseUrl}/characters?ts=1&apikey=${this.config.apiKey}&hash=${this.config.hash}`;
    const data = await this.httpClient.get(url, {responseType: 'json'}).toPromise();
    console.log(data); 
    return null;
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
