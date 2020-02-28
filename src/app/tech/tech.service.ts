import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModelProduct } from '../models/model-product';
import { ModelCustomer } from '../models/model-customer';

// const API = 'http://update.celtaware.com.br:9994';
const API = 'http://localhost:20854';
// const API = 'http://localhost:9991';

@Injectable({
  providedIn: 'root'
})
export class TechService {

  constructor(private http: HttpClient) { }

  addProduct(product: ModelProduct) {
     console.log('Chamando Post adicionar produto: ' + product.name);
     return this.http
     .post(API + '/api/product/Add/',  product);
  }

  addCustomer(customer: ModelCustomer) {
    console.log('Chamando Post adicionar produto: ' + customer.fantasyName);
    return this.http
    .post(API + '/api/customer/Add/',  customer);
 }

 getCustomer(customerId) {
  return this.http
  .get<ModelCustomer>(API + '/api/customer/Get?_customerId=' + customerId);
}
}
