import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.css']
})
export class DownloadsComponent implements OnInit {

  constructor() { }
  name:string = "";
  filter: string = '';


    receberEvento(_value){
      this.name = _value;
      console.log("componente pai download recebeu: "+ _value);
    }

  
  ngOnInit() {
     
  }

}
