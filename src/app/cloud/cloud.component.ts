import { Component, OnInit, Input } from '@angular/core';
import { ModelCustomersProducts } from '../models/model-customersproducts';
import { ModelCustomer } from 'src/app/models/model-customer';
import { CloudService } from './cloud.service';

@Component({
  selector: 'app-cloud',
  templateUrl: './cloud.component.html',
  styleUrls: ['./cloud.component.css']
})
export class CloudComponent implements OnInit {

  customerProduct: ModelCustomersProducts = null;
  customers: ModelCustomer[] = [];
  valorLoading = true;
  isActiveDash = false;
  constructor(private cloudService: CloudService) { }

  loadCustomers() {
    this.cloudService.getCustomersAll()
    .subscribe(customerArray => {
      this.customers = customerArray;
      this.valorLoading = false;
    },
    error => {
      alert('error ');
    } );
  }

  receberEvent(valueCustomerProduct) {
    this.customerProduct = valueCustomerProduct;
    if (this.customerProduct != null) {
        this.isActiveDash = true;
    }
  }
  ngOnInit() {
    this.loadCustomers();
  }

}
