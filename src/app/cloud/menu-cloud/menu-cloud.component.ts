import { ModelCustomersProducts } from './../../models/model-customersproducts';
import { Component, OnInit, OnChanges } from '@angular/core';
import { ModelCustomer } from 'src/app/models/model-customer';
import { CloudService } from '../cloud.service';

@Component({
  selector: 'app-menu-cloud',
  templateUrl: './menu-cloud.component.html',
  styleUrls: ['./menu-cloud.component.css']
})
export class MenuCloudComponent implements OnInit, OnChanges {


  customers: ModelCustomer[] = [];
  customerSelected: string;
  customerProducts: ModelCustomersProducts[] = [];
  productsCount: number;

  constructor(private cloudService: CloudService) { }

  loadCustomers() {
    this.cloudService.getCustomersAll()
    .subscribe(customerArray => {
      this.customers = customerArray;
    });
  }
  selectionProduct(value) {
    console.log(value);
    // aqui eu exporto valor de customerProducts
  }

  onChange(deviceValue) {
    this.cloudService.getCustomersProducts(deviceValue)
    .subscribe(arrayCustomerProduct => {
      console.log(this.customerProducts.length);
      this.customerProducts = arrayCustomerProduct;
      this.customerSelected = this.customerProducts[0].customer.fantasyName;
      this.productsCount = this.customerProducts.length;
    });
}

  ngOnInit() {
    this.loadCustomers();
  }

  ngOnChanges() {
  }

}
