import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModelProduct } from '../models/model-product';
import { ModelCustomer } from '../models/model-customer';
import { ModelCustomersProducts } from './../models/model-customersproducts';

const API = 'http://localhost:20854';

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
}
