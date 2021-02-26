import { ModelConcentrator } from './../models/model-concentrator';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceConcentratorService {

  constructor(private base: BaseService) { }

  addConcentrator(_appConc: ModelConcentrator) {
    return this.base.httpBase
    .post(this.base.urlapi + '/api/Concentrator/add/', _appConc, {responseType: 'text'})
    .pipe(
      tap(
        data => console.log(data),
        erro => console.log(erro)
      )
    );
  }
}
