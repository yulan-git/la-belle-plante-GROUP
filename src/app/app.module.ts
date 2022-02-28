import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PageAccueilComponent } from './pages/page-accueil/page-accueil.component';
import { PageDetailsComponent } from './pages/page-details/page-details.component';
import { PagePanierComponent } from './pages/page-panier/page-panier.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { FilterSideBarComponent } from './components/filter-side-bar/filter-side-bar.component';
import { CardPlantComponent } from './components/card-plant/card-plant.component';
import { IconComponent } from './components/icon/icon.component';
import { AvisBarComponent } from './components/avis-bar/avis-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    PageAccueilComponent,
    PageDetailsComponent,
    PagePanierComponent,
    PageNotFoundComponent,
    FilterSideBarComponent,
    CardPlantComponent,
    IconComponent,
    AvisBarComponent
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
