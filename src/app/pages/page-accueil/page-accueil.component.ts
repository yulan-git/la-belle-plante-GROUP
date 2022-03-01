import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlantService } from 'src/app/services/plant.service';
import * as _ from 'underscore';
import {LabelType, Options} from "@angular-slider/ngx-slider";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-page-accueil',
  templateUrl: './page-accueil.component.html',
  styleUrls: ['./page-accueil.component.scss']
})
export class PageAccueilComponent implements OnInit {
  // private data!: any[]; same as below
  private data: any[] | undefined;
  public listCategories!: string[];
  private subListProduct: Subscription;
  public listProduct!: any[];
  price = {
    minPrice: 100,
    maxPrice: 400
  }
  options: Options = {
    floor: 0,
    ceil: 500,
    showTicks: true,
    tickStep: 30,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return "<b>Min price:</b> $" + value;
        case LabelType.High:
          return "<b>Max price:</b> $" + value;
        default:
          return "$" + value;
      }
    }
  };


  constructor(private plantService: PlantService) {

    this.subListProduct = this.plantService.subjectListProduct$.subscribe(response => {
      console.log(response);
      this.data = response;
      this.listCategories = _.uniq(this.data.map(x => x.product_breadcrumb_label));
      console.log(this.listCategories);

      response.length = 40; // juste pour le dev dans notre contexte d'apprentissage
      this.listProduct = [...response];
    })

    this.plantService.getListProductsChaud();
  }

  ngOnInit(): void {

  }

  // methode de cycle de vie de mon composant qui est executée juste avant que l'instance de mon composant soit détruite
  ngOnDestroy(): void {
    this.subListProduct.unsubscribe();
  }

  changeRandomPrice($event:any) {
    let subscription = this.plantService.subjectListProduct$.subscribe(products => {
      products.length = 40;
      this.listProduct = products.filter(product =>
        product.product_unitprice_ati >= $event.value && product.product_unitprice_ati <= $event.highValue);
    }); this.plantService.getListProductsChaud();
  }
}
