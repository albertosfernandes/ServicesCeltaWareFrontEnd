import { ModelServer } from 'src/app/models/model-server';
import { error } from 'protractor';
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
  updateBtnText = 'Iniciar atualização';
  downloadBtnText = ' ';
  statusMessage: any;
  isUp = false;
  file: File;
  // _celtabsuserPassword = 'off';
  // debounce: Subject<string> = new Subject<string>();
  constructor(private cloudService: CloudService) { }

  loadDateDeploy(server: ModelServer, idvalue, productId) {
    this.cloudService.getDateTimeDeploy(server, idvalue, productId)
    .subscribe(dateDeploy => {
      this.dateObj = dateDeploy;
    });
  }

  loadLastExecution(server: ModelServer, idvalue) {
    this.cloudService.getLastExecution(this.customerProducts.server, idvalue)
    .subscribe(dateExecution => {
      this.lastExecution = dateExecution;
    });
  }

  loadVersionProduct(server: ModelServer, idvalue) {
    this.cloudService.getVersionFile(this.customerProducts.server, idvalue)
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
      this.cloudService.getUpdateSystem(this.customerProducts.server, valueModelCustomerProduct)
      .subscribe(data => {
        this.updateBtnText = 'Atualizar';
      },
      err => {
        alert('Erro na atualização: ' + err.error);
        this.isUpdating = false;
        this.updateBtnText = 'Atualizar';
      },
      () => {
        this.loadVersionProduct(this.customerProducts.server, this.customerProducts.customersProductsId);
        this.loadLastExecution(this.customerProducts.server, this.customerProducts.customersProductsId);
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

  upload(_file) {
    this.isUp = true;
    this.uploadFile(_file);
  }

  uploadFile(_file) {
    const selectedFile = <FileList>_file.srcElement.files;

    document.getElementById('customFileLabel').innerHTML = selectedFile[0].name;
    console.log('arquivo selecionado: ' + selectedFile[0].name + ' ' + selectedFile[0].size);
    this.file = selectedFile[0];
    this.isUp = true;
  }

  sendUploadFile() {
    console.log('arquivo: ' + this.file.name + ' ' + this.file.size);
    console.log('valor de customerId: ' + this.customerProducts.customerId);
    this.cloudService.uploadFileToBSF(this.customerProducts.customerId, this.file)
    .subscribe(resp => {
      console.log('upado com sucesso!');
    },
    err => {
      alert('Erro ao subir arquivo: ' + err.error);
    },
    () => {
      alert('Salvo com sucesso');
      this.isUp = false;
      document.getElementById('customFileLabel').innerHTML = '';
    });
  }

  updateCustomerProducts(customerproductId: ModelCustomersProducts) {
    this.cloudService.getCustomerProduct(customerproductId.customersProductsId)
    .subscribe(resp => {
      // .
    },
    err => {
      alert(err.error);
    },
    () => {
      // .
    });
  }

  downloadDeploy(valueCustomerId, productId) {
    this.isDownloading = true;
    this.cloudService.getDownloadDeploy(this.customerProducts.server, valueCustomerId, productId)
    .subscribe(response => {
      this._response = response;
      this.loadDateDeploy(this.customerProducts.server, this.customerProducts.customersProductsId, this.customerProducts.productId);
      this.downloadBtnText = 'Concluído com sucesso.';
    },
    err => {
      alert('Erro ao baixar arquivo: ' + err.error);
      this.isDownloading = false;
      this.downloadBtnText = 'Falha ao atualizar arquivo';
    },
    () => { this.isDownloading = false ; this.downloadBtnText = 'Concluído com sucesso.'; });
    this.downloadBtnText = 'Baixando ...';
  }


  ngOnInit() {

  }

  ngOnChanges() {
     this.loadDateDeploy(this.customerProducts.server, this.customerProducts.customersProductsId, this.customerProducts.productId);
     this.loadVersionProduct(this.customerProducts.server, this.customerProducts.customersProductsId);
     this.loadLastExecution(this.customerProducts.server, this.customerProducts.customersProductsId);
     this.isUpdateDatabase = false;
     this.downloadBtnText = ' ';
  }

  ngOnDestroy() {
    this.downloadBtnText = ' ';
  }

}
