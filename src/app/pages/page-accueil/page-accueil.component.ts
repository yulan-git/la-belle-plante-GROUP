import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlantService } from 'src/app/services/plant.service';
import * as _ from 'underscore';
import {LabelType, Options} from "@angular-slider/ngx-slider";

@Component({
  selector: 'app-page-accueil',
  templateUrl: './page-accueil.component.html',
  styleUrls: ['./page-accueil.component.scss']
})
export class PageAccueilComponent {
  // private data!: any[]; same as below
  private data!: any[];
  public plantTitleData!: any[] | undefined;
  public listProductFiltered!: any[];
  public listCategories!: string[];
  private subListProduct: Subscription;
  public listProduct!: any[];
  public productId!: any;
  public sortState: string = 'asc';

  public currentObjectPrice = {
    value : 0,
    highValue: 0
  }
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
      //console.log(response);
      this.data = response;
      this.listCategories = _.uniq(this.data.map(x => x.product_breadcrumb_label));
      console.log(this.listCategories);
      //response.length = 40; // juste pour le dev dans notre contexte d'apprentissage
      this.listProduct = [...response];
      this.listProductFiltered = this.listProduct;

    })

    this.plantService.getListProductsChaud();
  }

  sortByName(name: string) {
    this.sortState == 'asc' ? this.sortBy(name, 'desc') : this.sortBy(name, 'asc').reverse();
  }
  
  private sortBy(name: string, order: string) {
    this.sortState = order;
    return this.listProductFiltered = _.sortBy(this.listProductFiltered, (product: any) => {
      return isNaN(product[name]) == false ? parseFloat(product[name]) : product[name];
    });
  }



  searchFilter(event: any) {
    //console.log(event.target.value);
    let value = event.target.value;
    this.plantTitleData = this.data.filter(x => x.product_name.toLowerCase().includes(value.toLocaleLowerCase()));
    //console.log(this.plantTitleData);
    this.listProductFiltered = this.plantTitleData;
  }

  // methode de cycle de vie de mon composant qui est executée juste avant que l'instance de mon composant soit détruite
  ngOnDestroy(): void {
    this.subListProduct.unsubscribe();
  }

  changeRandomPrice($event:any) {
    // let subscription = this.plantService.subjectListProduct$.subscribe(products => {
    //   products.length = 40;
    this.currentObjectPrice.value = $event.value;
    this.currentObjectPrice.highValue = $event.highValue;
    console.log($event);
    
      this.listProductFiltered = this.listProductFiltered.filter(product =>
        product.product_unitprice_ati >= $event.value && product.product_unitprice_ati <= $event.highValue);
    // }); this.plantService.getListProductsChaud();
  }

  changeArray(arrayFiltered: any[]) {
    //console.log(arrayFiltered);
    this.listProductFiltered = [];
    this.listProduct.forEach(product => {
      if (arrayFiltered.includes(product.product_breadcrumb_label)) {
        this.listProductFiltered.push(product);
        this.changeRandomPrice(this.currentObjectPrice);
      } else if (arrayFiltered.length == 0) {
        this.listProductFiltered = this.listProduct;
        this.changeRandomPrice(this.currentObjectPrice);
      }
    });
  }

}
