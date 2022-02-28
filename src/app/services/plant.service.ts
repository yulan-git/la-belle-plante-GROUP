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

    // Abonnement observable froid
    this.obs$.subscribe(data => {
      console.log("Observer 1: ", data)
    })
    
    this.obs$.subscribe(data => {
      console.log("Observer 2: ", data)
    })
    
    
    // Emission via observable chauds
    this.sub$.next('Newletter Janvier 2021'); // envoyer une autre newletter Janvier 2021
    console.log('...Envoie nl janvier 2021')

    // Abonnement observable chauds
    this.sub$.subscribe(data => {
      console.log("Observer Subject 1: ", data);
    })

    this.sub$.subscribe(data => {
      console.log("Observer Subject 2: ", data);
    })

    this.sub$.subscribe(data => {
      console.log("Observer Subject 3: ", data);
    })

    this.sub$.next('Newletter Mars 2021'); // envoyer une autre newletter Mars 2021
    console.log('...Envoie nl Mars 2021')

    
    this.sub$.subscribe(data => {
      console.log("Observer Subject 4: ", data);
    })
    
    this.sub$.next('Newletter Avril 2021'); // envoyer une autre newletter Mars 2021
    console.log('...Envoie nl Avril 2021')


    this.behav$.subscribe(data => {
      console.log("Observer Behavior 1: ", data);
    })

    this.behav$.next('Video Mars 2021');

    this.behav$.subscribe(data => {
      console.log("Observer Behavior 2: ", data);
    })

    this.behav$.next('Video Avril 2021');

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
}
