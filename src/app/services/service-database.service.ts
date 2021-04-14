import { ModelDatabaseUser } from './../models/ModelDatabaseUser';
import { BaseService } from 'src/app/services/base.service';
import { Injectable } from '@angular/core';
import { ModelDatabase } from '../models/model-database';
import { tap } from 'rxjs/operators';
import { ModelBackupSchedule } from '../models/model-backupschedule';

@Injectable({
  providedIn: 'root'
})
export class ServiceDatabaseService {

  constructor(private base: BaseService) { }

  getDatabase(urlAPI, customerProductId) {
    return this.base.httpBase
    .get<ModelDatabase>('http://' + urlAPI + '/api/DatabaseService/GetByCustomerId?id=' + customerProductId);
  }

  getDatabases(urlApi, serverid) {
    return this.base.httpBase
      .get<ModelBackupSchedule[]>('http://' + urlApi + '/api/Databaseservice/GetAllByServer?serverId=' + serverid)
      .pipe(
        tap(
         data => console.warn(data),
         err => console.log(err.error)
        )
      );
  }

  addDatabase(urlAPI, _database: ModelDatabase) {
    return this.base.httpBase
    .post('http://' + urlAPI + '/api/DatabaseService/AddUpdate', _database, {responseType: 'text'})
    .pipe(
      tap(
        data => console.log(data),
        erro => console.log(erro)
      )
    );
  }

  addDatabaseUserPassword(urlAPI, _database: ModelDatabaseUser[]) {
    return this.base.httpBase
    .post('http://' + urlAPI + '/api/DatabaseUser/AddUpdate', _database, {responseType: 'text'})
    .pipe(
      tap(
        data => console.log(data),
        erro => console.log(erro)
      )
    );
  }

  execBackup(urlAPI, backupSchedule: ModelBackupSchedule) {
    return this.base.httpBase
    .post('http://' + urlAPI + '/api/DatabaseService/BackupExec', backupSchedule, { responseType: 'text' })
    .pipe(
      tap(
        data => console.warn(data),
        err => console.log(err.error)
      )
    );
  }

  execValidateBackup(urlAPI, backupSchedule: ModelBackupSchedule) {
    return this.base.httpBase
    .put('http://' + urlAPI + '/api/DatabaseService/ValidateBackupExec', backupSchedule, { responseType: 'text' })
    .pipe(
      tap(
        data => console.warn(data),
        err => console.log(err.error)
      )
    );
  }

  execUploadBackup(urlAPI, backupSchedule: ModelBackupSchedule) {
    return this.base.httpBase
    .post('http://' + urlAPI + '/api/GoogleDriveService/upload', backupSchedule, {responseType: 'text'} )
    .pipe(
      tap(
        data => console.warn(data),
        err => console.log(err.error)
      )
    );
  }


  execShrink(urlAPI, _databaseSchedule: ModelBackupSchedule) {
    return this.base.httpBase
    .post('http://' + urlAPI + '/api/DatabaseService/Shrink', _databaseSchedule, {responseType: 'text'} )
    .pipe(
      tap(
        data => console.warn(data),
        err => console.log(err.error)
      )
    );
  }

  execUpdateStatusBackup(urlAPI, backupSchedule: ModelBackupSchedule) {
    return this.base.httpBase
    .put('http://' + urlAPI + '/api/DatabaseSchedule/UpdateStatus', backupSchedule, {responseType: 'text'} )
    .pipe(
      tap(
        data => console.warn(data),
        err => console.log(err.error)
      )
    );
  }


}
