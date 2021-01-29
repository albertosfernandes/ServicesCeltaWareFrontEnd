import { BaseService } from './../services/base.service';
import { ModelCustomer } from './../models/model-customer';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModelProduct } from '../models/model-product';
import { ModelCustomersProducts } from '../models/model-customersproducts';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap  } from 'rxjs/operators';
import { ModelUser } from '../models/model-user';

// const this.base.urlapi = 'http://update.celtaware.com.br:9994';
// const this.base.urlapi = 'http://localhost:20854';
// const this.base.urlapi = 'http://localhost:9992';

@Injectable({
  providedIn: 'root'
})
export class TechService {
  // headers: HttpHeaders | { [header: string]: string | string[]; };

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

createCustomer(customer: ModelCustomer) {
  return this.base.httpBase
  .post(this.base.urlapi + '/api/customer/StartCloud/',  customer);
}

 getCustomer(customerId) {
  return this.base.httpBase
  .get<ModelCustomer>(this.base.urlapi + '/api/customer/Get?_customerId=' + customerId);
}

findCustomer(customerValue): Observable<ModelCustomer> {
  return this.base.httpBase
  .get<ModelCustomer>(this.base.urlapi + '/api/customer/Find?valueSearch=' + customerValue);
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
