import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tech',
  templateUrl: './tech.component.html',
  styleUrls: ['./tech.component.css']
})
export class TechComponent implements OnInit {

  constructor() { }
  tog = true;
  menuActive = 'dash';

  getToggle(cliquei) {
    console.log('recebeu evento: ' + this.tog);
    this.tog = !this.tog;
  }

  getMenu(_value) {
    this.menuActive = _value;
  }

  ngOnInit() {
  }

}
