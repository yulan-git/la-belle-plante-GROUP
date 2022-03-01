import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter-side-bar',
  templateUrl: './filter-side-bar.component.html',
  styleUrls: ['./filter-side-bar.component.scss']
})
export class FilterSideBarComponent{
  @Input() listCategoriesFilter: string[];
  @Output() avisNumber = new EventEmitter<any>();

  constructor() {
    this.listCategoriesFilter = [];
   }

  // ngOnInit(): void {
  // }

  public onChangeValue(eventValue: any): void {
    console.log('Event Change :',eventValue);
  }

  getAvisNumber(event: any) {
    let index = event+1;
    //console.log(index);
    this.avisNumber.emit(index);
  }

}
