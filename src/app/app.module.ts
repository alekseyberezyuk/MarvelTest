import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeroesViewerComponent } from './components/heroes-viewer/heroes-viewer.component';
import { HeroInfoComponent } from './components/hero-info/hero-info.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesViewerComponent,
    HeroInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
