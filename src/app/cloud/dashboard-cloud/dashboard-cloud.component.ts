import { CloudService } from './../cloud.service';
import { Component, OnInit, Input, OnChanges, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ModelCustomersProducts } from 'src/app/models/model-customersproducts';
import { format } from 'url';
import { formatDate } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-cloud',
  templateUrl: './dashboard-cloud.component.html',
  styleUrls: ['./dashboard-cloud.component.css']
})
export class DashboardCloudComponent implements OnInit, OnChanges, OnDestroy {

  @Input() customerProducts: ModelCustomersProducts = null;
  deployDate = 'erro ao obter arquivo';
  teste: Date;
  dateObj: any;
  versionProduct: any;
  lastExecution: any;
  _response: any;
  isDownloading = false;
  isUpdating = false;
  isUpdateDatabase = false;
  updateBtnText = 'Atualizar';
  downloadBtnText = 'Baixar (Deploy)';
  statusMessage: any;
  _celtabsuserPassword = 'off';
  debounce: Subject<string> = new Subject<string>();
  constructor(private cloudService: CloudService) { }

  loadDateDeploy(idvalue, productId) {
    this.cloudService.getDateTimeDeploy(idvalue, productId)
    .subscribe(dateDeploy => {
      this.dateObj = dateDeploy;
    });
  }

  loadLastExecution(idvalue) {
    this.cloudService.getLastExecution(idvalue)
    .subscribe(dateExecution => {
      this.lastExecution = dateExecution;
    });
  }

  loadVersionProduct(idvalue) {
    this.cloudService.getVersionFile(idvalue)
    .subscribe(dateVersion => {
      this.versionProduct = dateVersion;
    });
  }

  update(valueModelCustomerProduct) {
    this.isUpdating = true;
    if (valueModelCustomerProduct.product.productId === 6) {
      this.isUpdateDatabase = true;
      this.isUpdating = false;
    } else {
      this.cloudService.getUpdateSystem(valueModelCustomerProduct)
      .subscribe(data => {
        this.updateBtnText = 'Atualizar';
        this.loadVersionProduct(this.customerProducts.customersProductsId);
        this.loadLastExecution(this.customerProducts.customersProductsId);
      },
      error => {alert('error '); this.isUpdating = false; this.updateBtnText = 'Atualizar'; },
      () => {
        this.isUpdating = false;
        this.updateBtnText = 'Atualizar';
        this.isUpdateDatabase = false;
      });
      this.updateBtnText = 'Atualizando ...';
    }
  }

  btnTesteClick() {
    // this.cloudService.teste('kkkliy', 'fff')
    // .subscribe(resp => console.log('upado com sucesso!'));
  }

  getKeyFile(valueCustomerProduct) {
    this.cloudService.getKeyFile(valueCustomerProduct.customersProductsId)
    .subscribe(responser => {
      // console.log(responser);
      const newBlob = new Blob([responser], { type: 'application/x-zip' });

       // IE doesn't allow using a blob object directly as link href
            // instead it is necessary to use msSaveOrOpenBlob
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
              window.navigator.msSaveOrOpenBlob(newBlob);
              return;
          }

          // For other browsers:
            // Create a link pointing to the ObjectURL containing the blob.
      const data = window.URL.createObjectURL(newBlob);

      const link = document.createElement('a');
      link.href = data;
      link.download = 'ParChaves' + valueCustomerProduct.customer.fantasyName + '.zip';
      // this is necessary as link.click() does not work on the latest firefox
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));


    });
  }

  updateConnectionString(valueCustomerProduct) {
    this.cloudService.updateConnectionString(valueCustomerProduct.customersProductsId, this._celtabsuserPassword)
    .subscribe(response => {
      alert('Atualizado');
    });
  }

  downloadDeploy(valueCustomerId, productId) {
    this.isDownloading = true;
    this.cloudService.getDownloadDeploy(valueCustomerId, productId)
    .subscribe(response => {
      this._response = response;
      this.loadDateDeploy(this.customerProducts.customersProductsId, this.customerProducts.productId);
      this.downloadBtnText = 'Baixar (Deploy)';
    },
    error => {alert('error'); this.isDownloading = false; this.downloadBtnText = 'Baixar (Deploy)'; },
    () => { this.isDownloading = false ; this.downloadBtnText = 'Baixar (Deploy)'; });
    this.downloadBtnText = 'Baixando ...';
  }


  ngOnInit() {
    this.debounce
            .pipe(debounceTime(300))
            .subscribe(filter => this._celtabsuserPassword = filter);
  }

  ngOnChanges() {
     this.loadDateDeploy(this.customerProducts.customersProductsId, this.customerProducts.productId);
     this.loadVersionProduct(this.customerProducts.customersProductsId);
     this.loadLastExecution(this.customerProducts.customersProductsId);
     this.isUpdateDatabase = false;
  }

  ngOnDestroy() {
    this.debounce.unsubscribe();
  }

}
