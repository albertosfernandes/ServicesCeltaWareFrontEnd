import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ModelSincservices } from '../models/model-sincservices';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceSincServiceService {

  constructor(private base: BaseService) { }

  addSincService(_appSincService: ModelSincservices) {
    return this.base.httpBase
    .post(this.base.urlapi + '/api/AppSincService/AddUpdate/', _appSincService, {responseType: 'text'})
    .pipe(
      tap(
        data => console.log(data),
        erro => console.log(erro)
      )
    );
  }

  findSincServicebyCustomersProduct(customerProductId) {
    return this.base.httpBase
    .get<ModelSincservices>(this.base.urlapi + '/api/AppSincService/GetByCustomersProducts?customersProductsId=' + customerProductId)
    .pipe(
      tap(
        data => console.log(data),
        err => console.log(err.error)
      )
    );
  }
}
