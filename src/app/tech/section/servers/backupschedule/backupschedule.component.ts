import { ServiceDatabaseService } from './../../../../services/service-database.service';
import { ModelBackupSchedule } from 'src/app/models/model-backupschedule';
import { ModelDatabase } from './../../../../models/model-database';
import { TechService } from './../../../tech.service';
import { ModelServer } from './../../../../models/model-server';
import { ServersService } from './../servers.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ModelCustomersProducts } from 'src/app/models/model-customersproducts';
import { CloudService } from 'src/app/cloud/cloud.service';

@Component({
  selector: 'app-backupschedule',
  templateUrl: './backupschedule.component.html',
  styleUrls: ['./backupschedule.component.css']
})
export class BackupscheduleComponent implements OnInit {

  @Input() _server: ModelServer;

  customerProducts: ModelCustomersProducts[] = [];
  databasesSchedules: ModelBackupSchedule[] = [];
  databases: ModelDatabase[] = [];
  customerProduct: ModelCustomersProducts;
  @Output() changeDatabase = new EventEmitter();
  isLoading = true;
  isShowSchedules = false;

  constructor(private serversService: ServersService, private cloudService: CloudService,
              private databaseService: ServiceDatabaseService) { }

  loadDatabasesForServerId() {
    this.databaseService.getDatabases(this._server.ipAddress + ':' + this._server.port, this._server.serversId)
    .subscribe(databasesArray => {
      this.databases = databasesArray;
    },
    error => {
      alert('Erro ao carregar produtos deste servidor: ' + this._server.hostname);
    },
    () => {
      this.isLoading = false;
    });
  }

  onChange(value) {
    this.cloudService.getCustomerProduct(value)
    .subscribe(_customerProduct => {
      this.customerProduct = _customerProduct;
    },
    error => {
      console.log('Erro ao puxar customerProduct');
    },
    () => {
      this.isShowSchedules = true;
      // this.loadCustomerProductForServerId();
    });
  }

  ngOnInit() {
    this.loadDatabasesForServerId();
  }

}
