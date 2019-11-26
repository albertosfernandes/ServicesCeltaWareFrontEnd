import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tech',
  templateUrl: './tech.component.html',
  styleUrls: ['./tech.component.css']
})
export class TechComponent implements OnInit {

  constructor() { }
  tog: boolean = true;
  menuActive: string = "dash";
  
  getToggle(cliquei){
    console.log("receber evento: " + this.tog);
    this.tog = !this.tog;
  }

  getMenu(_value){
    this.menuActive = _value;
  }

  ngOnInit() {
  }

}
