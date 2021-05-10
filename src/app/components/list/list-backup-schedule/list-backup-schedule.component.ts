import { ServiceDatabaseService } from './../../../services/service-database.service';
import { ModelDatabase } from '../../../models/model-database';
import { ServersService } from '../../../tech/section/servers/servers.service';
import { ModelBackupSchedule } from '../../../models/model-backupschedule';
import { ModelCustomersProducts } from 'src/app/models/model-customersproducts';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-list-backup-schedule',
  templateUrl: './list-backup-schedule.component.html',
  styleUrls: ['./list-backup-schedule.component.css']
})
export class ListBackupScheduleComponent implements OnInit, OnChanges {

  backupScheduleFormGroup: FormGroup;
  @Input() customerProduct: ModelCustomersProducts;
  urlFull: string;
  backupSchedule: ModelBackupSchedule;
  backupsSchedules: ModelBackupSchedule [] = [];
  database: ModelDatabase;
  isShowNew = false;
  backupType: number;


  constructor(private formBuilder: FormBuilder, private serversService: ServersService,
              private databaseService: ServiceDatabaseService) { }

  initForm() {
    this.backupScheduleFormGroup = this.formBuilder.group({
      customersProductsId: [this.customerProduct.customersProductsId],
      type: [],
      dateHourExecution: [],
      backupStatus: [],
      directory: []
    });
  }

  onSubmitBackupSchedule() {
    console.log('customerProduct value: ' + this.customerProduct);
    this.backupSchedule = this.backupScheduleFormGroup.getRawValue();
    this.backupSchedule.type = this.backupType;
    this.backupSchedule.customersProductsId = this.customerProduct.customersProductsId;
    this.backupSchedule.databasesId = this.database.databasesId;
    this.backupSchedule.backupStatus = 4;
    this.serversService.addBackupSchedule(this.urlFull, this.backupSchedule)
    .subscribe(data => {
      const res = data;
    },
    error => {
      console.log('erro ao gravar agendamento de backup');
    },
    () => {
      alert('Agendamento ' + this.database.customerProduct.synchronizerServiceName +  ' salvo com sucesso.');
      this.initForm();
      this.loadListSchedulesBackup(this.customerProduct.customersProductsId);
    });
  }
  onChangeSelect(backupTypeValue) {
    this.backupType = backupTypeValue;
  }

  ShowNew() {
    this.isShowNew = !this.isShowNew;
  }
  btnCancel() {

  }

  loadListSchedulesBackup(customerProductId) {
    this.serversService.getSchedulesBackupFromApi(this.urlFull, customerProductId)
    .subscribe(schedule => {
      this.backupsSchedules = schedule;
      console.log(this.backupsSchedules);
    },
    error => {
      alert('Erro ao consultar agendas');
    },
    () => {
       this.loadDatabase();
    });
  }

  loadDatabase() {
    this.databaseService.getDatabase(this.urlFull, this.customerProduct.customersProductsId)
    .subscribe(datavalue => {
        this.database = datavalue;
      },
      error => {
        alert('Erro ao carregar Banco de dados do cliente: ' + this.customerProduct.customer.fantasyName);
      },
      () => {

      });
  }

  ngOnInit() {
    this.urlFull = this.customerProduct.server.ipAddress + ':' + this.customerProduct.server.port;
    this.loadListSchedulesBackup(this.customerProduct.customersProductsId);
    this.initForm();
  }

  ngOnChanges() {
    this.urlFull = this.customerProduct.server.ipAddress + ':' + this.customerProduct.server.port;
    this.loadListSchedulesBackup(this.customerProduct.customersProductsId);
  }

}
