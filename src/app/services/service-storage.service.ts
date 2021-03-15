import { ModelStorageServer } from './../models/ModelStorageServer';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceStorageService {

  constructor(private base: BaseService) { }

  getStorages (serverId) {
    return this.base.httpBase
    .get<ModelStorageServer[]>(this.base.urlapi + '/api/StorageServer/GetAll?serverId=' + serverId)
    .pipe(
      tap(
        data => console.warn(data),
        err => console.log(err)
      )
    );
  }

  addUpdate (_storageServer: ModelStorageServer) {
    return this.base.httpBase
    .post(this.base.urlapi + '/api/StorageServer/AddUpdate', _storageServer, {responseType: 'text'})
    .pipe(
      tap(
        data => (console.warn(data)),
        err => (console.warn(err.error))
      )
    );
  }
}
