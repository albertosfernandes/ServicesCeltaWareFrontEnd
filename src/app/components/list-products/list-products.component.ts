import { Subscription } from 'rxjs';
import { CloudService } from 'src/app/cloud/cloud.service';
import { ModelProduct } from 'src/app/models/model-product';
import { Component, OnInit, Input, OnChanges, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ModelCustomersProducts } from 'src/app/models/model-customersproducts';
import { BrowserStack } from 'protractor/built/driverProviders';

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
  isAlterSettingsBSF = false;
  // isAlterSettingsCCS = false;
  isAlterSettingsCross = false;
  isAlterSettingsSincServices = false;
  isAlterSettingsSincWeb = false;
  isAlterSettingsConcentrator = false;
  productsId: number[] = [
    1, 2, 3, 4, 5
  ];
  customersProductsId;

  constructor(private cloudService: CloudService) { }

  onclickCustomerProd(_customerProduId, productId) {
    this.customersProductsId = _customerProduId;
    switch (productId) {
      case 1: {
        this.clearAll(1);
        break;
      }
      case 2: {
        this.clearAll(2);
        break;
      }
      case 3: {
        this.clearAll(3);
        break;
      }
      case 4: {
        alert('opçao 4');
        this.clearAll(4);
        break;
      }
      case 5 : {
        this.clearAll(5);
        break;
      }
    }

  }

  clearAll(option) {
    this.isAlterSettingsBSF = false;
    this.isAlterSettingsCross = false;
    this.isAlterSettingsSincServices = false;
    this.isAlterSettingsSincWeb = false;
    this.isAlterSettingsConcentrator = false;

    switch (option) {
      case 1: {
        this.isAlterSettingsBSF = true;
        break;
      }
      case 2: {
        this.isAlterSettingsCross = true;
        break;
      }
      case 3: {
        this.isAlterSettingsSincWeb = true;
        break;
      }
      case 4: {
        this.isAlterSettingsConcentrator = true;
        break;
      }
      case 5 : {
        this.isAlterSettingsSincServices = true;
        break;
      }
    }

  }
  onclickCreate() {

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
