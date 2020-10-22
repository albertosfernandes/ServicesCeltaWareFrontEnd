import { ModelDatabase } from './../../../models/model-database';
import { ModelCustomersProducts } from 'src/app/models/model-customersproducts';
import { ModelServer } from './../../../models/model-server';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ModelBackupSchedule } from 'src/app/models/model-backupschedule';
import { t } from '@angular/core/src/render3';

// const API = 'http://update.celtaware.com.br:9994';
const API = 'http://localhost:20854';
// const API = 'http://localhost:9991';


@Injectable({
  providedIn: 'root'
})
export class ServersService {

  constructor(private http: HttpClient) { }

  getServersAll() {
    return this.http
    .get<ModelServer[]>(API + '/api/servers/GetAll');
  }

  getServer(serverId: number) {
    console.log('get server ' + serverId);
    return this.http
    .get<ModelServer>(API + '/api/servers/get?id=' + serverId);
  }

  getCustomerProductsFromApiServer(urlApi, serverid) {
    return this.http
      .get<ModelCustomersProducts[]>('http://' + urlApi + '/api/DatabaseSchedule/GetAllDatabases?serverId=' + serverid)
      .pipe(
        tap(
         // data => console.log(data),
         // error => console.log(error)
        )
      );
  }

  getDatabasesFromApiServer(urlApi, serverid) {
    return this.http
      .get<ModelBackupSchedule[]>('http://' + urlApi + '/api/Databaseservice/GetAllByServer?serverId=' + serverid)
      .pipe(
        tap(
         // data => console.log(data),
         // error => console.log(error)
        )
      );
  }

  getSchedulesBackupFromApi(urlAPI, customerProductId) {
    return this.http
      .get<ModelBackupSchedule[]>('http://' + urlAPI + '/api/DatabaseSchedule/GetAll?id=' + customerProductId);
  }

  addBackupSchedule(urlApi, backupSchedule: ModelBackupSchedule) {
    return this.http
    .post('http://' + urlApi + '/api/DatabaseSchedule/Add', backupSchedule);
  }

  addServer(server: ModelServer) {
    return this.http
      .post(API + '/api/Servers/Add', server);
  }

  getDatabase(urlAPI, customerProductId) {
    return this.http
    .get<ModelDatabase>('http://' + urlAPI + '/api/DatabaseService/GetByCustomerId?id=' + customerProductId);
  }

  addDatabase(urlAPI, database: ModelDatabase) {
    return this.http
    .post('http://' + urlAPI + '/api/DatabaseService/Add', database)
    .pipe(
      tap(

      )
    );
  }
}
