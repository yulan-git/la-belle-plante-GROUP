import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  baseUrl: string;

  subjectListProduct$ = new Subject<any[]>();

  // Test des Observables froids
  obs$ = new Observable(fluxData => fluxData.next(Math.random()));

  // Test des Observables chauds
  sub$ = new Subject<string>();

  behav$ = new BehaviorSubject<string>('Video Janvier 2021');



  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrlApi;

   }

  getListProducts(): Observable<any[]> {
    // requete http sur l'url http://localhost:3000/list_products
    return this.http.get<any[]>(`${this.baseUrl}/list_products`);
  }

  getListProductsChaud(): void {
    this.getListProducts().subscribe(data => {
      this.subjectListProduct$.next(data);
    })
  }


  getProductById(productId:any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/list_products?product_id=${productId}`)
  }
}
