import { ModelServer } from './../../../models/model-server';
import { ServersService } from './../servers/servers.service';
import { ModelDatabase } from './../../../models/model-database';
import { CloudService } from 'src/app/cloud/cloud.service';
import { ModelCustomersProducts } from 'src/app/models/model-customersproducts';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-form-database',
  templateUrl: './form-database.component.html',
  styleUrls: ['./form-database.component.css']
})
export class FormDatabaseComponent implements OnInit, OnChanges {

  serverid: number;
  customerId: number;
  databaseForm: FormGroup;
  server: ModelServer;
  database: ModelDatabase;
  customersProducts: ModelCustomersProducts[] = [];
  constructor(private formBuilder: FormBuilder, private cloudService: CloudService, private serverService: ServersService) { }

  receiveServerId(_serverId) {
    this.serverid = _serverId;
    console.log('ServerId recebido: ' + _serverId);
    this.loadCustomerProductsDatabase();
  }

  receivedCustomerId(_customerId) {
    this.customerId = _customerId;
    console.log('CustomerId recebido: ' + _customerId);
  }

  loadCustomerProductsDatabase() {
    console.log('loadCustomerProductsDatabase ' + this.serverid);
    this.cloudService.getCustomersProductsAllDatabases(this.serverid)
    .subscribe(customersProductsData => {
      this.customersProducts = customersProductsData;
    },
    error => {
      alert('Erro ao carregar clientes com banco de dados');
    },
    () => {
      console.log('chamando get server ' + this.serverid);
      this.getServer(this.serverid);
    });
  }

  getServer(serverId) {
    this.serverService.getServer(serverId)
    .subscribe(serverIdData => {
      this.server = serverIdData;
    },
    error => {
      alert('Erro ao carregar servidores');
    },
    () => {

    });
  }

  initForm() {
    this.databaseForm = this.formBuilder.group({
      databasesId: [0],
      conteinerName: [],
      databaseName: [],
      memoryRam: [],
      directory: []
    });
  }
  onSubmitDatabase() {
    this.database = this.databaseForm.getRawValue();
    this.database.customersProductsId = this.customerId;
    this.serverService.addDatabase(this.server.ipAddress + ':' + this.server.port, this.database)
    .subscribe(response => {

    },
    error => {
      alert('Erro ao gravar database');
    },
    () => {
      this.initForm();
    });
  }
  ngOnInit() {
    this.initForm();
  }

  ngOnChanges() {
    if (this.serverid > 0) {
      this.loadCustomerProductsDatabase();
    }
  }

}
