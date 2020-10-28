import { ModelCustomersProducts } from './../../../models/model-customersproducts';
import { ModelBackupSchedule } from './../../../models/model-backupschedule';
import { ServersService } from './../../../tech/section/servers/servers.service';
import { Component, Input, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { ModelServer } from 'src/app/models/model-server';

@Component({
  selector: 'app-cards-database',
  templateUrl: './cards-database.component.html',
  styleUrls: ['./cards-database.component.css']
})
export class CardsDatabaseComponent implements OnInit, OnChanges, OnDestroy {

  databasebackupSchedules: ModelBackupSchedule[] = [];
  @Input() customerProductIdInput;
  @Input() serverInput: ModelServer;
  memoryRamValueTotal: number;
  storageValueTotal: number;
  urlServerApi;
  constructor(private serversServices: ServersService) { }

  loadBackupSchedules(_urlServerId, _customerProductId) {
    this.serversServices.getSchedulesBackupFromApiByCustomerProducts(_urlServerId, _customerProductId)
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
    });
  }

  ngOnInit() {
    console.log('cards database: ' + this.customerProductIdInput);
    this.urlServerApi = this.serverInput.ipAddress + ':' + this.serverInput.port;
    this.loadBackupSchedules(this.urlServerApi, this.customerProductIdInput);
  }
  ngOnDestroy() {

  }
  ngOnChanges() {
    this.urlServerApi = this.serverInput.ipAddress + ':' + this.serverInput.port;
    this.loadBackupSchedules(this.urlServerApi, this.customerProductIdInput);
  }

}
