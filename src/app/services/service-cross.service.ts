import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ModelCross } from '../models/model-cross';

@Injectable({
  providedIn: 'root'
})
export class ServiceCrossService {

  constructor(private base: BaseService) { }

  addCross(_appCross: ModelCross) {
    return this.base.httpBase
    .post(this.base.urlapi + '/api/AppCross/AddUpdate/', _appCross, {responseType: 'text'})
    .pipe(
      tap(
        data => console.log(data),
        erro => console.log(erro)
      )
    );
  }

  findCrossbyCustomersProduct(customerProductId) {
    return this.base.httpBase
    .get<ModelCross>(this.base.urlapi + '/api/AppCross/GetByCustomersProducts?customersProductsId=' + customerProductId)
    .pipe(
      tap(
        data => console.log(data),
        err => console.log(err.error)
      )
    );
  }

}
