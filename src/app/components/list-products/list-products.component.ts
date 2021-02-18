import { Subscription } from 'rxjs';
import { CloudService } from 'src/app/cloud/cloud.service';
import { ModelProduct } from 'src/app/models/model-product';
import { Component, OnInit, Input, OnChanges, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ModelCustomersProducts } from 'src/app/models/model-customersproducts';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit, OnChanges, OnDestroy {

  customersProducts: ModelCustomersProducts[];
  @Input() customerId = 0;
  @Output() isNewCustomerProductclick = new EventEmitter();
  sub: Subscription[] = [];

  constructor(private cloudService: CloudService) { }

  onclickCustomerProd(_customerProduId) {
    alert(_customerProduId);
  }

  newCustomerProducsts() {
    this.isNewCustomerProductclick.emit(true);
  }

  ngOnInit() {
    this.sub.push(
      this.cloudService.getCustomersProducts(this.customerId)
      .subscribe(customersdata => {
        this.customersProducts = customersdata;
      },
      error => {
        alert('Erro ao carregar produtos por empresa');
      },
      () => {

      })
    );
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

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe);
  }
}
