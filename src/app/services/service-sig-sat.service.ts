import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceSigSatService {

  constructor(private base: BaseService) { }

  generateKey(cnpj) {
    return this.base.httpBase
    .get(this.base.urlapi + '/api/SignSat/GenerateKey?cnpjCustomer=' + cnpj, {responseType: 'text'})
    .pipe(
      tap()
    );
  }
}
