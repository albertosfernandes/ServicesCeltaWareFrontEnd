import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModelProduct } from '../models/model-product';
import { ModelCustomer } from '../models/model-customer';
import { ModelCustomersProducts } from './../models/model-customersproducts';

// const API = 'http://update.celtaware.com.br:9994';
// const API = 'http://localhost:20854';
const API = 'http://localhost:9991';

@Injectable({
  providedIn: 'root'
})

export class CloudService {


  constructor(private http: HttpClient) { }

  getProductsAll() {
    return this.http
    .get<ModelProduct[]>(API + '/api/product/getall');
  }
  getCustomersAll() {
    return this.http
    .get<ModelCustomer[]>(API + '/api/customer/getall');
  }

  getCustomersProducts(id) {
    return this.http
    .get<ModelCustomersProducts[]>(API + '/api/CustomersProducts/get?id=' + id);
  }

  getDateTimeDeploy(id, productid) {
    return this.http
    .get(API + '/api/SystemUpdate/GetDateTimeFileDeploy?customersettingsId=' + id + '&productId=' + productid);
  }

  getVersionFile(id) {
    return this.http
    .get(API + '/api/SystemUpdate/GetVersionFile?customersettingsId=' + id);
  }

  getStatusService(_serviceName) {
    return this.http
    .get(API + '/api/SystemUpdate/StatusService?servicename=' + _serviceName, { responseType: 'text' });
  }

  getStartStopService(isStart, _serviceName) {
    return this.http
    .get(API + '/api/SystemUpdate/StarStopService?isStart=' + isStart + '&servicename=' + _serviceName);
  }

  getDownloadDeploy(id, productid) {
    return this.http
    .get(API + '/api/SystemUpdate/DownloadDeploy?id=' + id + '&productId=' + productid);
  }

  getUpdateSystem(customerProduct: ModelCustomersProducts) {
    console.log('Chamando Post atualizar ' + customerProduct.product.name);
    return this.http
    .post(API + '/api/SystemUpdate/UpdateCeltaBS',  customerProduct);
  }
}
