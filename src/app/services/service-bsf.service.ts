import { browser, error } from 'protractor';
import { ModelBsf } from './../models/model-bsf';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceBsfService {

  constructor(private base: BaseService) { }

  findBsf(bsfId) {
    return this.base.httpBase
    .get<ModelBsf>(this.base.urlapi + '/api/AppBsf/Get?id=' + bsfId)
    .pipe(
      tap(
        data => console.log(data),
        err => console.log(err.error)
      )
    );
  }

  get(_customerId) {
    return this.base.httpBase
    .get<ModelBsf[]>(this.base.urlapi + '/api/AppBsf/GetByCustomer?customerId=' + _customerId)
    .pipe(
      tap(
        data => console.log(data),
        err => console.log(err.error)
      )
    );
  }
  addBsf(_appBsf: ModelBsf) {
    return this.base.httpBase
    .post(this.base.urlapi + '/api/AppBsf/add/', _appBsf, {responseType: 'text'})
    .pipe(
      tap(
        data => console.log(data),
        erro => console.log(erro)
      )
    );
  }

  createBsfOncloud(_appBsf: ModelBsf) {
    return this.base.httpBase
    .post('http://' + _appBsf.customerProduct.server.ipAddress +  ':' + _appBsf.customerProduct.server.port +
    '/api/AppBsf/CreateInCloud/',  _appBsf, { responseType: 'text' })
    .pipe(
      tap(
        data => console.log(data),
        err => console.log(err.error)
      )
    );
  }
}
