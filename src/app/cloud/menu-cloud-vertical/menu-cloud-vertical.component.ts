import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-cloud-vertical',
  templateUrl: './menu-cloud-vertical.component.html',
  styleUrls: ['./menu-cloud-vertical.component.css']
})
export class MenuCloudVerticalComponent implements OnInit {

  constructor() { }

  menu: string;
  isOpen = true;

  bntMenu(value) {
    this.menu = value;
  }

  ngOnInit() {
  }

}
