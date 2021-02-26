import { ModelBsf } from './../models/model-bsf';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceBsfService {

  constructor(private base: BaseService) { }

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
}
