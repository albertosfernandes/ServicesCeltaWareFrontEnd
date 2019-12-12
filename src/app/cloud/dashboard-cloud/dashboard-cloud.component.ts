import { CloudService } from './../cloud.service';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ModelCustomersProducts } from 'src/app/models/model-customersproducts';
import { format } from 'url';
import { formatDate } from '@angular/common';
import { stringify } from 'querystring';

@Component({
  selector: 'app-dashboard-cloud',
  templateUrl: './dashboard-cloud.component.html',
  styleUrls: ['./dashboard-cloud.component.css']
})
export class DashboardCloudComponent implements OnInit, OnChanges {

  @Input() customerProducts: ModelCustomersProducts;
  deployDate = 'erro ao obter arquivo';
  teste: Date;
  dateObj: any;
  _response: any;
  isDownloading = false;
  isUpdating = false;
  constructor(private cloudService: CloudService) { }

  loadDateDeploy(idvalue) {
    console.log('chamando service de get deploy');
    this.cloudService.getDateTimeDeploy(idvalue)
    .subscribe(dateDeploy => {
      this.dateObj = dateDeploy;
      // this.teste = new Date(dateDeploy | date));
      console.log('data deploy: ' + this.dateObj);
    });
  }

  update(valueModelCustomerProduct) {
    this.isUpdating = true;
    this.cloudService.getUpdateSystem(valueModelCustomerProduct)
    .subscribe(data => {
    },
    error => {alert('error '); this.isUpdating = false; },
    () => this.isUpdating = false );
  }

  downloadDeploy(valueCustomerId) {
    this.isDownloading = true;
    this.cloudService.getDownloadDeploy(valueCustomerId)
    .subscribe(response => {
      this._response = response;
    },
    error => {alert('error'); this.isDownloading = false; },
    () => this.isDownloading = false );
  }

  ngOnInit() {
    // this.loadDateDeploy('1');
  }

  ngOnChanges() {
     this.loadDateDeploy(this.customerProducts.customersProductsId);
  }

}
