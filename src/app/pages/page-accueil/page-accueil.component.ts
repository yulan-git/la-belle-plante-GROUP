import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlantService } from 'src/app/services/plant.service';
import * as _ from 'underscore';
import { LabelType, Options } from "@angular-slider/ngx-slider";

@Component({
  selector: 'app-page-accueil',
  templateUrl: './page-accueil.component.html',
  styleUrls: ['./page-accueil.component.scss']
})
export class PageAccueilComponent {
  // private data!: any[]; same as below
  private data!: any[];
  public listProductFiltered!: any[];
  public listCategories!: string[];
  private subListProduct: Subscription;
  public listProduct!: any[];
  public productId!: any;
  public sortState: string = 'asc';
  avisNumber: number = 1;
  stringSearch:string = "";
  arrayCategory: any[] = [];

  public currentObjectPrice = {
    value: 0,
    highValue: 0
  }

  public objectFilter = {
    avisNumber: this.avisNumber,
    stringSearch: this.stringSearch,
    arrayCategory: this.arrayCategory,
    currentObjectPrice: this.currentObjectPrice
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

    console.log(this.objectFilter);
    

    this.subListProduct = this.plantService.subjectListProduct$.subscribe(response => {
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
    this.stringSearch = value;
    this.objectFilter.stringSearch = value;
    this.filter(this.objectFilter);
  }

  // methode de cycle de vie de mon composant qui est executée juste avant que l'instance de mon composant soit détruite
  ngOnDestroy(): void {
    this.subListProduct.unsubscribe();
  }

  changeRandomPrice($event: any) {
    this.currentObjectPrice.value = $event.value;
    this.currentObjectPrice.highValue = $event.highValue;
    this.objectFilter.currentObjectPrice = this.currentObjectPrice;
    this.filter(this.objectFilter);
  }

  changeArray(arrayFiltered: any[]) {
    this.arrayCategory = arrayFiltered;
    this.objectFilter.arrayCategory = arrayFiltered;
    this.filter(this.objectFilter);
  }

  getAvisNumber(event:any) {
    this.avisNumber = event;
    this.objectFilter.avisNumber = event;
    this.filter(this.objectFilter); 
  }

  filter(obj: any) {        

    this.subListProduct = this.plantService.subjectListProduct$.subscribe(products => {
      if (obj.avisNumber != 0) {
        this.listProductFiltered = this.listProductFiltered.filter(x => x.product_avis >= obj.avisNumber);
      }
      if (obj.arrayCategory.length != 0) {
        this.listProductFiltered = this.listProductFiltered.filter(x => obj.arrayCategory.includes(x.product_breadcrumb_label));
      }
      if (obj.stringSearch != "") {
        this.listProductFiltered = this.listProductFiltered.filter(x => x.product_name.toLowerCase().includes(obj.stringSearch.toLocaleLowerCase()));
      }
      if (obj.currentObjectPrice.value != 0 && obj.currentObjectPrice.highValue != 0) {
        this.listProductFiltered = this.listProductFiltered.filter(product =>
          product.product_unitprice_ati >= obj.currentObjectPrice.value && product.product_unitprice_ati <= obj.currentObjectPrice.highValue);
      }
    })

    this.plantService.getListProductsChaud();
    
  }

}
