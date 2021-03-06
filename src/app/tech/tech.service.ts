import { ModelServer } from 'src/app/models/model-server';
import { BaseService } from './../services/base.service';
import { ModelCustomer } from './../models/model-customer';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModelProduct } from '../models/model-product';
import { ModelCustomersProducts } from '../models/model-customersproducts';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap  } from 'rxjs/operators';
import { ModelUser } from '../models/model-user';


@Injectable({
  providedIn: 'root'
})
export class TechService {

  constructor(private base: BaseService) { }


  addProduct(product: ModelProduct) {
     console.log('Chamando Post adicionar produto: ' + product.name);
     return this.base.httpBase
     .post(this.base.urlapi + '/api/product/Add/',  product);
  }

  addCustomer(customer: ModelCustomer) {
    console.log('Chamando Post adicionar produto: ' + customer.fantasyName);
    console.log(customer);
    return this.base.httpBase
    .post<ModelCustomer>(this.base.urlapi + '/api/customer/Add', customer);
 }

 addCustomerProduct(customerProduct: ModelCustomersProducts) {
  return this.base.httpBase
  .post(this.base.urlapi + '/api/customersproducts/Add/',  customerProduct)
  .pipe(
    tap(

    )
  );
}

createCustomerProduct(customerProduct: ModelCustomersProducts) {
  return this.base.httpBase
  .post(this.base.urlapi + '/api/customersproducts/CreateCustomerProduct/',  customerProduct, { responseType: 'text' })
  .pipe(
    tap(

    )
  );
}

createCustomerProductDatabase(customerProduct: ModelCustomersProducts) {
  return this.base.httpBase
  .get(this.base.urlapi + '/api/DatabaseCreate/CreateConfigs?id=' + customerProduct.customersProductsId);
}

createCustomer(customer: ModelCustomer, _server: ModelServer) {
  return this.base.httpBase
  .post('http://' + _server.ipAddress + ':' + _server.port + '/api/customer/StartCloud/',  customer, {responseType: 'text'})
  .pipe(
    tap(
      data => console.log(data),
      err => console.log(err.error)
    )
  );
}

 getCustomer(customerId) {
  return this.base.httpBase
  .get<ModelCustomer>(this.base.urlapi + '/api/customer/Get?_customerId=' + customerId);
}

findCustomer(customerValue): Observable<ModelCustomer[]> {
  return this.base.httpBase
  .get<ModelCustomer[]>(this.base.urlapi + '/api/customer/Find?valueSearch=' + customerValue);
}

getUsers() {
  return this.base.httpBase
  .get<ModelUser[]>(this.base.urlapi + '/api/users/GetAll');
}

changeStatusUser(userId) {
  return this.base.httpBase
  .get(this.base.urlapi + '/api/users/ChangeStatus?id=' + userId);
}

}
