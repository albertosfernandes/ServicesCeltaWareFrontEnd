import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-celta-vpn',
  templateUrl: './celta-vpn.component.html',
  styleUrls: ['./celta-vpn.component.css']
})
export class CeltaVpnComponent implements OnInit {

  constructor() { }

  vpns: any[] = [
    { Id: 1, User: "Alberto", DateConect: "14/01/2019", Server: "Cliente1" },
    { Id: 2, User: "William", DateConect: "14/01/2019", Server: "Cliente2" },
  ];

  ngOnInit() {
    
  }

}
