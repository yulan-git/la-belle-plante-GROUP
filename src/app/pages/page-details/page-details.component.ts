import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlantService } from 'src/app/services/plant.service';

@Component({
  selector: 'app-page-details',
  templateUrl: './page-details.component.html',
  styleUrls: ['./page-details.component.scss']
})

export class PageDetailsComponent implements OnInit {
  plant: any;
  constructor(private plantService: PlantService, private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const productId = this.activeRoute.snapshot.queryParamMap.get('productId');
    
    if (productId) {
      this.plantService.getProductById(productId).subscribe( product => {
        console.log("detail ----> ",product);
        this.plant = product[0];
      })
    }
  }
}

