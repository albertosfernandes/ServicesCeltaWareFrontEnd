import { Component, OnInit, Input } from '@angular/core';
import { ModelCustomersProducts } from '../models/model-customersproducts';

@Component({
  selector: 'app-cloud',
  templateUrl: './cloud.component.html',
  styleUrls: ['./cloud.component.css']
})
export class CloudComponent implements OnInit {

  customerProduct: ModelCustomersProducts;
  teste: string;
  // myTeste='Aqui deve ir nome do produto!';

  constructor() { }

  receberEvent(valueCustomerProduct) {
    this.customerProduct = valueCustomerProduct;
  }
  ngOnInit() {
  }

}
