import { ModelCustomersProducts } from './../../models/model-customersproducts';
import { Component, OnInit, OnChanges, Output, Input, EventEmitter } from '@angular/core';
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
  classspinner: 'spinner-border';
  isLoading = false;
  isActive: any = '';
  @Output() changeCustomerProduct = new EventEmitter();
  @Input() customersMenu: ModelCustomer[] = [];

  constructor(private cloudService: CloudService) {  }

  loadCustomers() {
    this.cloudService.getCustomersAll()
    .subscribe(customerArray => {
      this.customers = customerArray;
      this.isLoading = false;
      console.log('apos execucao do load' + this.isLoading);
    },
    error => {
      alert('error ');
    } );
  }

  selectionProduct(value) {
    this.changeCustomerProduct.emit(value);
    this.isActive = value.customersProductsId;
  }

  onChange(deviceValue) {
    this.cloudService.getCustomersProducts(deviceValue)
    .subscribe(arrayCustomerProduct => {
      this.customerProducts = arrayCustomerProduct;
      this.customerSelected = this.customerProducts[0].customer.fantasyName;
      this.productsCount = this.customerProducts.length;
    });
}

  ngOnInit() {
    // console.log('carregando loadCustomers ' + this.isLoading);
    // this.loadCustomers();
    // console.log('fim do loadCustomers ' + this.isLoading);
  }

  ngOnChanges() {
  }

}
