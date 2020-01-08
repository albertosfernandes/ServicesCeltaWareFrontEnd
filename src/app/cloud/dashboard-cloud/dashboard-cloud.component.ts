import { CloudService } from './../cloud.service';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ModelCustomersProducts } from 'src/app/models/model-customersproducts';
import { format } from 'url';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-dashboard-cloud',
  templateUrl: './dashboard-cloud.component.html',
  styleUrls: ['./dashboard-cloud.component.css']
})
export class DashboardCloudComponent implements OnInit, OnChanges {

  @Input() customerProducts: ModelCustomersProducts = null;
  deployDate = 'erro ao obter arquivo';
  teste: Date;
  dateObj: any;
  versionProduct: any;
  _response: any;
  isDownloading = false;
  isUpdating = false;
  updateBtnText = 'Atualizar';
  downloadBtnText = 'Baixar (Deploy)';
  constructor(private cloudService: CloudService) { }

  loadDateDeploy(idvalue) {
    this.cloudService.getDateTimeDeploy(idvalue)
    .subscribe(dateDeploy => {
      this.dateObj = dateDeploy;
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
    this.cloudService.getUpdateSystem(valueModelCustomerProduct)
    .subscribe(data => {
      this.updateBtnText = 'Atualizar';
      this.loadVersionProduct(this.customerProducts.customersProductsId);
    },
    error => {alert('error '); this.isUpdating = false; this.updateBtnText = 'Atualizar'; },
    () => {this.isUpdating = false; this.updateBtnText = 'Atualizar'; });
    this.updateBtnText = 'Atualizando ...';
  }

  downloadDeploy(valueCustomerId) {
    this.isDownloading = true;
    this.cloudService.getDownloadDeploy(valueCustomerId)
    .subscribe(response => {
      this._response = response;
      this.loadDateDeploy(this.customerProducts.customersProductsId);
      this.downloadBtnText = 'Baixar (Deploy)';
    },
    error => {alert('error'); this.isDownloading = false; this.downloadBtnText = 'Baixar (Deploy)'; },
    () => { this.isDownloading = false ; this.downloadBtnText = 'Baixar (Deploy)'; });
    this.downloadBtnText = 'Baixando ...';
  }

  ngOnInit() {
    // this.loadDateDeploy('1');
  }

  ngOnChanges() {
     this.loadDateDeploy(this.customerProducts.customersProductsId);
     this.loadVersionProduct(this.customerProducts.customersProductsId);
  }

}
