import { Component, Input, OnInit } from '@angular/core';
import { HeroData } from 'src/app/models/heroData';

@Component({
  selector: 'hero-info',
  templateUrl: './hero-info.component.html',
  styleUrls: ['./hero-info.component.scss']
})
export class HeroInfoComponent implements OnInit {
  @Input() hero: HeroData;
  
  constructor() { }

  ngOnInit(): void {
  }

}
