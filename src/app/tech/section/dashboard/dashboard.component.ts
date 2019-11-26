import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  usersTotal: number = 0;
  connectedUsers: number = 0;

  serversTotal: number = 0;
  portsTotal: number = 0;
  alerts: number = 0;

  ngOnInit() {
  }

}
