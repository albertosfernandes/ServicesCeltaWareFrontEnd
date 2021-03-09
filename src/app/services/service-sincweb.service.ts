import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ModelSincweb } from '../models/model-sincweb';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceSincwebService {

  constructor(private base: BaseService) { }

  addSincWeb(_appSincWeb: ModelSincweb) {
    return this.base.httpBase
    .post(this.base.urlapi + '/api/AppSincWeb/addUpdate/', _appSincWeb, {responseType: 'text'})
    .pipe(
      tap(
        data => console.log(data),
        erro => console.log(erro)
      )
    );
  }

  findSincWebbyCustomersProduct(customerProductId) {
    return this.base.httpBase
    .get<ModelSincweb>(this.base.urlapi + '/api/AppSincWeb/GetByCustomersProducts?customersProductsId=' + customerProductId)
    .pipe(
      tap(
        data => console.log(data),
        err => console.log(err.error)
      )
    );
  }
}
