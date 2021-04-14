import { ModelServer } from './../models/model-server';
import { ModelCustomersProducts } from './../models/model-customersproducts';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceCustomerProductService {

  constructor(private base: BaseService) { }

  addCustomerProduct(_customerProducts: ModelCustomersProducts) {
    return this.base.httpBase
    .post('http://' + _customerProducts.server.ipAddress +  ':' + _customerProducts.server.port +
    '/api/CustomerProducts/AddUpdate/',  _customerProducts, { responseType: 'text' })
    .pipe(
      tap(
        data => console.warn(data),
        err => console.log(err.error)
      )
    );
  }
}
