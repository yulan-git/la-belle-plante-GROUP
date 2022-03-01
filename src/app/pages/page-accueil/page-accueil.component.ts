import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlantService } from 'src/app/services/plant.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-page-accueil',
  templateUrl: './page-accueil.component.html',
  styleUrls: ['./page-accueil.component.scss']
})
export class PageAccueilComponent {
  // private data!: any[]; same as below
  private data: any[] | undefined;
  public listCategories!: string[];
  private subListProduct: Subscription;
  public listProduct!: any[];
  listProductFiltered!: any[];

  constructor(private plantService: PlantService) {

    this.subListProduct = this.plantService.subjectListProduct$.subscribe(response => {
      console.log(response);
      this.data = response;
      this.listCategories = _.uniq(this.data.map(x => x.product_breadcrumb_label));
      console.log(this.listCategories);
      
      //response.length = 40; // juste pour le dev dans notre contexte d'apprentissage
      this.listProduct = [...response];
      this.listProductFiltered = this.listProduct;
    })

    this.plantService.getListProductsChaud();
  }

  // ngOnInit(): void {

  // }

  // methode de cycle de vie de mon composant qui est executée juste avant que l'instance de mon composant soit détruite
  ngOnDestroy(): void {
    this.subListProduct.unsubscribe();
  }

  getAvisNumber(event:any) {
    //console.log(event);
    //console.log(this.listProductFiltered.filter(x=> x.product_avis == 4));
    
    this.listProductFiltered = this.listProduct.filter(x => x.product_avis >= event);
  }

}
