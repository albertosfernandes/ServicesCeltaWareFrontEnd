import { ModelDatabase } from './../../../models/model-database';
import { ModelCustomersProducts } from 'src/app/models/model-customersproducts';
import { ModelServer } from './../../../models/model-server';
import { Injectable } from '@angular/core';
import { tap, timeout, catchError } from 'rxjs/operators';
import { ModelBackupSchedule } from 'src/app/models/model-backupschedule';
import { BaseService } from 'src/app/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class ServersService {

  constructor(private base: BaseService) { }

  getServersAll() {
    return this.base.httpBase
    .get<ModelServer[]>(this.base.urlapi + '/api/servers/GetAll');
  }

  getServer(serverId: number) {
    console.log('get server ' + serverId);
    return this.base.httpBase
    .get<ModelServer>(this.base.urlapi + '/api/servers/get?id=' + serverId);
  }

  getServersStorage() {
    return this.base.httpBase
    .get<ModelServer[]>(this.base.urlapi + '/api/servers/GetStorages');
  }

  getCustomerProductsFromApiServer(urlApi, serverid) {
    return this.base.httpBase
      .get<ModelCustomersProducts[]>('http://' + urlApi + '/api/DatabaseSchedule/GetAllDatabases?serverId=' + serverid)
      .pipe(
        tap(
         // data => console.log(data),
         // error => console.log(error)
        )
      );
  }

  getSchedulesBackupFromApi(urlAPI, customerProductId) {
    return this.base.httpBase
      .get<ModelBackupSchedule[]>('http://' + urlAPI + '/api/DatabaseSchedule/GetAll?id=' + customerProductId);
  }

  getSchedulesBackupFromApiByCustomerProducts(urlAPI, customerProductId) {
    return this.base.httpBase
      .get<ModelBackupSchedule[]>('http://' + urlAPI + '/api/DatabaseSchedule/GetAllByCustomerProduct?customerProductId='
                                  + customerProductId)
      .pipe(
        tap(
          // tslint:disable-next-line: no-shadowed-variable
          error => console.log(error)
        )
      );
  }
  addBackupSchedule(urlApi, backupSchedule: ModelBackupSchedule) {
    return this.base.httpBase
    .post('http://' + urlApi + '/api/DatabaseSchedule/Add', backupSchedule, {responseType: 'text'});
  }

  addServer(server: ModelServer) {
    return this.base.httpBase
      .post(this.base.urlapi + '/api/Servers/Add', server);
  }

}
