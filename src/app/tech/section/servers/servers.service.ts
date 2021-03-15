import { error } from 'protractor';
import { ModelDatabase } from './../../../models/model-database';
import { ModelCustomersProducts } from 'src/app/models/model-customersproducts';
import { ModelServer } from './../../../models/model-server';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, timeout, catchError } from 'rxjs/operators';
import { ModelBackupSchedule } from 'src/app/models/model-backupschedule';

const API = 'http://update.celtaware.com.br:9994';
// const API = 'http://localhost:20854';
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
         data => console.log(data),
         // tslint:disable-next-line: no-shadowed-variable
         error => console.log(error)
        )
      );
  }

  getSchedulesBackupFromApi(urlAPI, customerProductId) {
    return this.http
      .get<ModelBackupSchedule[]>('http://' + urlAPI + '/api/DatabaseSchedule/GetAll?id=' + customerProductId);
  }

  getSchedulesBackupFromApiByCustomerProducts(urlAPI, customerProductId) {
    return this.http
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
    return this.http
    .post('http://' + urlApi + '/api/DatabaseSchedule/Add', backupSchedule, {responseType: 'text'});
  }

  addServer(server: ModelServer) {
    return this.http
      .post(API + '/api/Servers/Add', server);
  }

  getDatabase(urlAPI, customerProductId) {
    return this.http
    .get<ModelDatabase>('http://' + urlAPI + '/api/DatabaseService/GetByCustomerId?id=' + customerProductId);
  }

  addDatabase(urlAPI, _database: ModelDatabase) {
    return this.http
    .post('http://' + urlAPI + '/api/DatabaseService/AddUpdate', _database, {responseType: 'text'})
    .pipe(
      tap(
        data => console.log(data),
        erro => console.log(erro)
      )
    );
  }

  execBackup(urlAPI, backupSchedule: ModelBackupSchedule) {
    return this.http
    .post('http://' + urlAPI + '/api/DatabaseService/BackupExec', backupSchedule, { responseType: 'text' })
    .pipe(
      timeout(4000000),
      tap(

      )
    );
  }

  execValidateBackup(urlAPI, backupSchedule: ModelBackupSchedule) {
    return this.http
    .put('http://' + urlAPI + '/api/DatabaseService/ValidateBackupExec', backupSchedule, { responseType: 'text' })
    .pipe(
      timeout(4000000),
      tap(
        data => console.log(data),
        // tslint:disable-next-line: no-shadowed-variable
        error => console.log(error.error)
      )
    );
  }

  execUploadBackup(urlAPI, backupSchedule: ModelBackupSchedule) {
    return this.http
    .post('http://' + urlAPI + '/api/GoogleDriveService/upload', backupSchedule, {responseType: 'text'} )
    .pipe(
      timeout(4000000),
      tap(
        data => console.log(data),
        // tslint:disable-next-line: no-shadowed-variable
        error => console.log(error.error)
      )
    );
  }

  execShrink(urlAPI, _databaseSchedule: ModelBackupSchedule) {
    return this.http
    .post('http://' + urlAPI + '/api/DatabaseService/Shrink', _databaseSchedule, {responseType: 'text'} )
    .pipe(
      timeout(4000000),
      tap(
        data => console.log(data),
        // tslint:disable-next-line: no-shadowed-variable
        error => console.log(error.error)
      )
    );
  }

  execUpdateStatusBackup(urlAPI, backupSchedule: ModelBackupSchedule) {
    return this.http
    .put('http://' + urlAPI + '/api/DatabaseSchedule/UpdateStatus', backupSchedule, {responseType: 'text'} )
    .pipe(
      timeout(400000),
      tap(
        data => console.log(data),
        // tslint:disable-next-line: no-shadowed-variable
        error => console.log(error.error)
      )
    );
  }
}
