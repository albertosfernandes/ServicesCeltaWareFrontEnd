import { Subscription } from 'rxjs';
import { CloudService } from 'src/app/cloud/cloud.service';
import { Component, OnInit, Input, OnChanges, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ModelCustomersProducts } from 'src/app/models/model-customersproducts';
import { ModelBsf } from 'src/app/models/model-bsf';
import { ModelSincservices } from 'src/app/models/model-sincservices';
import { ModelSincweb } from 'src/app/models/model-sincweb';
import { ServiceBsfService } from 'src/app/services/service-bsf.service';
import { ModelCross } from 'src/app/models/model-cross';
import { ModelConcentrator } from 'src/app/models/model-concentrator';

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
  isReadToCloud = false;
  _bsfProducts: ModelBsf[] = [];
  _ccsProducts: ModelCross[] = [];
  _sincServiceProducts: ModelSincservices[] = [];
  _sicWebProducts: ModelSincweb[] = [];
  _concentratorProducts: ModelConcentrator[] = [];

  constructor(private cloudService: CloudService, private bsfService: ServiceBsfService) { }

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

  _bsfreceived(bsfValue) {
    console.log('listProduct valor recebido de BSFID criado: ' + bsfValue);
  }
  onclickCreate() {

  }

  loadCustomersProducts() {
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

  // loadProducstsFull (_customersProducstsValue: ModelCustomersProducts[]) {
  //   _customersProducstsValue.forEach(cp => {
  //     switch (cp.productId) {
  //       case 1: {
  //         this.loadBsfCustomerProducts();
  //         break;
  //       }
  //       case 2: {
  //         this.isAlterSettingsCross = true;
  //         break;
  //       }
  //       case 3: {
  //         this.isAlterSettingsSincWeb = true;
  //         break;
  //       }
  //       case 4: {
  //         this.isAlterSettingsConcentrator = true;
  //         break;
  //       }
  //       case 5 : {
  //         this.isAlterSettingsSincServices = true;
  //         break;
  //       }
  //     }
  //   });
  // }

  newCustomerProducsts() {
    this.isNewCustomerProductclick.emit(true);
  }

  ngOnInit() {
    this.loadCustomersProducts();

    }

  ngOnChanges() {
    this.loadCustomersProducts();

  }

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe);
  }
}
