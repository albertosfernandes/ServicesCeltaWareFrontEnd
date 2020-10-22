import { CloudService } from 'src/app/cloud/cloud.service';
import { ModelProduct } from 'src/app/models/model-product';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ModelCustomersProducts } from 'src/app/models/model-customersproducts';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit, OnChanges {

  // @Input() product: 'inicio ';
  customersProducts: ModelCustomersProducts[];
  @Input() customerId = 0;

  constructor(private cloudService: CloudService) { }

  ngOnInit() {
    this.cloudService.getCustomersProducts(this.customerId)
    .subscribe(customersdata => {
      this.customersProducts = customersdata;
    },
    error => {
      alert('Erro ao carregar produtos por empresa');
    });
  }

  ngOnChanges() {
    this.cloudService.getCustomersProducts(this.customerId)
    .subscribe(customersdata => {
      this.customersProducts = customersdata;
    },
    error => {
      alert('Erro ao carregar produtos por empresa');
    });
  }

}
