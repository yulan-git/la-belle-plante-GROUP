import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-avis-bar',
  templateUrl: './avis-bar.component.html',
  styleUrls: ['./avis-bar.component.scss']
})
export class AvisBarComponent {
  @Output() avisNumber = new EventEmitter<any>();

  starStates: {stateSelectedUser : boolean, stateHoverUser : boolean}[];

  constructor() {
    this.starStates = [];

    for (let index = 0; index < 5; index++) {
      this.starStates.push(
        {
          stateSelectedUser : false,
          stateHoverUser : false
        }
      );
    }   }

  // ngOnInit(): void {

  // }

  onMouseOver(index: number) {
    //console.log("star over", index);
    for (let i = 0; i < this.starStates.length ; i++) {
      if(i <= index) {
        this.starStates[i].stateHoverUser = true;
      } else {
        this.starStates[i].stateHoverUser = false;
      }
    }
  }

  onMouseLeave() {
    // this.starState = ['star', 'star', 'star', 'star', 'star'];
    const tempTab = [];
    for (let index = 0; index < this.starStates.length; index++) {
      tempTab.push(
        {
          stateSelectedUser : this.starStates[index].stateSelectedUser,
          stateHoverUser : this.starStates[index].stateSelectedUser
        }
      );
    }
    this.starStates = [...tempTab];
  }

  onClickStar(starIndex: number) {
    this.avisNumber.emit(starIndex);
    for (let i = 0; i < this.starStates.length ; i++) {
      if(i <= starIndex) {
        this.starStates[i].stateSelectedUser = true;
      } else {
        this.starStates[i].stateSelectedUser = false;
      }
    }
  }

}
