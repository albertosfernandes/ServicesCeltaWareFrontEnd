import { Component, OnInit, Input } from '@angular/core';
import { ModelCustomersProducts } from '../models/model-customersproducts';

@Component({
  selector: 'app-cloud',
  templateUrl: './cloud.component.html',
  styleUrls: ['./cloud.component.css']
})
export class CloudComponent implements OnInit {

  customerProduct: ModelCustomersProducts;
  constructor() { }

  ngOnInit() {
  }

}
