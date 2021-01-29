import { CloudService } from './../../../cloud/cloud.service';
import { error } from 'protractor';
import { ModelCustomersProducts } from './../../../models/model-customersproducts';
import { ModelBackupSchedule } from './../../../models/model-backupschedule';
import { ServersService } from './../../../tech/section/servers/servers.service';
import { Component, Input, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { ModelServer } from 'src/app/models/model-server';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';

@Component({
  selector: 'app-cards-database',
  templateUrl: './cards-database.component.html',
  styleUrls: ['./cards-database.component.css']
})
export class CardsDatabaseComponent implements OnInit, OnChanges, OnDestroy {

  databasebackupSchedules: ModelBackupSchedule[] = [];
  @Input() customerProductIdInput;
  @Input() serverInput: ModelServer;
  @Input() customerProducts: ModelCustomersProducts = null;
  memoryRamValueTotal: number;
  storageValueTotal: number;
  urlServerApi;
  message;
  isRunning = false;
  isSucces = false;
  responseBackupExec;
  _celtabsuserPassword = ' ';
  debounce: Subject<string> = new Subject<string>();
  sub: Subscription[] = [];
  constructor(private serversServices: ServersService, private cloudService: CloudService) { }

  loadBackupSchedules(_urlServerId, _customerProductId) {
    this.sub.push(this.serversServices.getSchedulesBackupFromApiByCustomerProducts(_urlServerId, _customerProductId)
    .subscribe(backupSchedulesList => {
      this.databasebackupSchedules = backupSchedulesList;
    },
    erro => {
      alert('Erro ao carregar informações de backup');
    },
    () => {
      // fim
      // console.log(this.backupSchedules[0]);
      this.memoryRamValueTotal = this.databasebackupSchedules[0].databases.memoryRam;
      this.storageValueTotal = this.databasebackupSchedules[0].databases.storage;
    })
    );
  }

  executeBackup(backupEscheduleValue: ModelBackupSchedule) {
    this.isRunning = true;
    this.message = 'Executando Backup.';
    this.sub.push(
      this.serversServices.execBackup(this.urlServerApi, backupEscheduleValue)
      .subscribe(result => {
        this.responseBackupExec = result;
        console.log('Backup: ' + result);
      },
      erro => {
        alert('Erro ao executar backup: ' + erro.error);
        this.isRunning = false;
      },
      () => {
        this.executeValidateBackup(backupEscheduleValue);
        this.isRunning = false;
      })
    );
  }

  executeValidateBackup(backupEscheduleValue) {
    this.isRunning = true;
    this.message = 'Validando Backup.';
    this.sub.push(
      this.serversServices.execValidateBackup(this.urlServerApi, backupEscheduleValue)
      .subscribe(result => {
        this.responseBackupExec = result;
        console.log('Validando..');
      },
      erro => {
        alert('Erro ao Validar backup: ' + erro.error);
        this.isRunning = false;
      },
      () => {
        this.isRunning = false;
        this.executeUploadBackup(backupEscheduleValue);
      })
    );
  }

  executeUploadBackup(backupEscheduleValue: ModelBackupSchedule) {
    this.isRunning = true;
    this.message = 'Subindo para Google Drive.';
    this.sub.push(
      this.serversServices.execUploadBackup(this.urlServerApi, backupEscheduleValue)
      .subscribe(result => {
        this.responseBackupExec = result;
      },
      erro => {
        alert('Erro para subir arquivo' + erro.error);
        this.isRunning = false;
      },
      () => {
        console.log(this.responseBackupExec);
        this.isRunning = false;
        this.isSucces = true;
        // this.execUpdateStatusBackup(backupEscheduleValue, this.responseBackupExec);
      })
    );
  }

  execUpdateStatusBackup(backupEscheduleValue: ModelBackupSchedule, googleDriveFileId) {
    this.isRunning = true;
    this.message = 'Atualizando status';
    backupEscheduleValue.backupStatus = 0;
    backupEscheduleValue.googleDriveFileId = googleDriveFileId;
    console.log('Antes de enviar Update: ' + backupEscheduleValue);
    this.sub.push(
      this.serversServices.execUpdateStatusBackup(this.urlServerApi, backupEscheduleValue)
      .subscribe(result => {
        this.responseBackupExec = result;
      },
      erro => {
        alert(erro.error);
        this.isRunning = false;
      },
      () => {
        this.isRunning = false;
        this.isSucces = false;
      })
    );
  }

  updateConnectionString(valueCustomerProduct) {
    this.cloudService.updateConnectionString(valueCustomerProduct.customersProductsId, this._celtabsuserPassword)
    .subscribe(response => {
      alert('Atualizado');
    },
    erro => {

    },
    () => {
    });
  }

  ngOnInit() {
    console.log('cards database: ' + this.customerProductIdInput);
    this.urlServerApi = this.serverInput.ipAddress + ':' + this.serverInput.port;
    this.loadBackupSchedules(this.urlServerApi, this.customerProductIdInput);
    this.debounce
            .pipe(debounceTime(300))
            .subscribe(filter => this._celtabsuserPassword = filter);
  }
  ngOnDestroy() {
    this.sub.forEach(s => s.unsubscribe);
    this.debounce.unsubscribe();
  }
  ngOnChanges() {
    this.urlServerApi = this.serverInput.ipAddress + ':' + this.serverInput.port;
    this.loadBackupSchedules(this.urlServerApi, this.customerProductIdInput);
  }

}
