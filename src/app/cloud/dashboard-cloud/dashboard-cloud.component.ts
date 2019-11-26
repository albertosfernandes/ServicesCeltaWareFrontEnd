import { Component, OnInit, Input } from '@angular/core';
import { ModelCustomersProducts } from 'src/app/models/model-customersproducts';

@Component({
  selector: 'app-dashboard-cloud',
  templateUrl: './dashboard-cloud.component.html',
  styleUrls: ['./dashboard-cloud.component.css']
})
export class DashboardCloudComponent implements OnInit {

  @Input() customerProducts: ModelCustomersProducts;
  constructor() { }

  ngOnInit() {
  }

}
