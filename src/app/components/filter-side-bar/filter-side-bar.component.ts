import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter-side-bar',
  templateUrl: './filter-side-bar.component.html',
  styleUrls: ['./filter-side-bar.component.scss']
})
export class FilterSideBarComponent{
  @Input() listCategoriesFilter: string[];
  filteredArray: string[] = [];
  @Output() submittedFilteredArray: EventEmitter<any> = new EventEmitter;

  constructor() {
    this.listCategoriesFilter = [];
   }

  
  public onChangeValue(eventValue: any, category:string): void {
    //console.log('Event Change :',eventValue);
    

    if (eventValue.target.checked) {
      this.filteredArray.push(category);
    } else {
      let index = this.filteredArray.findIndex(category => category == eventValue.target.value);
      //console.log(index);  
      this.filteredArray.splice(index, 1);
    }
    //console.log(this.filteredArray);
    this.changeArray();
      
  }

  changeArray() {
    this.submittedFilteredArray.emit(this.filteredArray);
  }

}
