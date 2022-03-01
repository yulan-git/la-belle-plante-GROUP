import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})

export class IconComponent {
  @Input() name!: string;
  @Input() size!: number;
  @Input() color!: string;

  constructor() { }


}
