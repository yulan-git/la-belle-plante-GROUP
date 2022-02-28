import { Component, OnInit } from '@angular/core';
import { PlantService } from 'src/app/services/plant.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent  {
  public title: string;
  public lengthListProduct!: number;

  constructor(private plantService: PlantService) {
    this.title = '🪴 La Belle Plante';
    
    this.plantService.subjectListProduct$.subscribe(data => {
      this.lengthListProduct = data.length;
    })
  }

  // ngOnInit(): void {
  // }

}
