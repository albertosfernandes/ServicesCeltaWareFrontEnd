import { ModelCross } from './../models/model-cross';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceCrossService {

  constructor(private base: BaseService) { }

  addCross(_appCross: ModelCross) {
    return this.base.httpBase
    .post(this.base.urlapi + '/api/AppCross/add/', _appCross, {responseType: 'text'})
    .pipe(
      tap(
        data => console.log(data),
        erro => console.log(erro)
      )
    );
  }
}
