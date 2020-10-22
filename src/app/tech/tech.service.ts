import { ModelCustomer } from './../models/model-customer';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModelProduct } from '../models/model-product';
import { ModelCustomersProducts } from '../models/model-customersproducts';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap  } from 'rxjs/operators';
import { ModelUser } from '../models/model-user';

// const API = 'http://update.celtaware.com.br:9994';
const API = 'http://localhost:20854';
// const API = 'http://localhost:9991';

@Injectable({
  providedIn: 'root'
})
export class TechService {
  // headers: HttpHeaders | { [header: string]: string | string[]; };

  constructor(private http: HttpClient) { }


  addProduct(product: ModelProduct) {
     console.log('Chamando Post adicionar produto: ' + product.name);
     return this.http
     .post(API + '/api/product/Add/',  product);
  }

  addCustomer(customer: ModelCustomer) {
    console.log('Chamando Post adicionar produto: ' + customer.fantasyName);
    console.log(customer);
    return this.http
    .post<ModelCustomer>(API + '/api/customer/Add', customer);
 }

 addCustomerProduct(customerProduct: ModelCustomersProducts) {
  return this.http
  .post(API + '/api/customersproducts/Add/',  customerProduct)
  .pipe(
    tap(

    )
  );
}

createCustomerProduct(customerProduct: ModelCustomersProducts) {
  return this.http
  .post(API + '/api/customersproducts/CreateCustomerProduct/',  customerProduct, { responseType: 'text' })
  .pipe(
    tap(

    )
  );
}

createCustomerProductDatabase(customerProduct: ModelCustomersProducts) {
  return this.http
  .get(API + '/api/DatabaseCreate/CreateConfigs?id=' + customerProduct.customersProductsId);
}

createCustomer(customer: ModelCustomer) {
  return this.http
  .post(API + '/api/customer/StartCloud/',  customer);
}

 getCustomer(customerId) {
  return this.http
  .get<ModelCustomer>(API + '/api/customer/Get?_customerId=' + customerId);
}

findCustomer(customerValue): Observable<ModelCustomer> {
  return this.http
  .get<ModelCustomer>(API + '/api/customer/Find?valueSearch=' + customerValue);
}

getUsers() {
  return this.http
  .get<ModelUser[]>(API + '/api/users/GetAll');
}

changeStatusUser(userId) {
  return this.http
  .get(API + '/api/users/ChangeStatus?id=' + userId);
}

}
