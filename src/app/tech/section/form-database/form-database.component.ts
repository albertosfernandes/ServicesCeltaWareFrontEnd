import { ModelDatabaseUser } from './../../../models/ModelDatabaseUser';
import { Subscription } from 'rxjs';
import { ModelServer } from './../../../models/model-server';
import { ServersService } from './../servers/servers.service';
import { ModelDatabase } from './../../../models/model-database';
import { CloudService } from 'src/app/cloud/cloud.service';
import { ModelCustomersProducts } from 'src/app/models/model-customersproducts';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-form-database',
  templateUrl: './form-database.component.html',
  styleUrls: ['./form-database.component.css']
})
export class FormDatabaseComponent implements OnInit, OnChanges, OnDestroy {

  serverid: number;
  customerId: number;
  databaseForm: FormGroup;
  server: ModelServer;
  database: ModelDatabase = new ModelDatabase();
  databaseUsers: ModelDatabaseUser[] = [];
  databaseUser: ModelDatabaseUser = new ModelDatabaseUser();
  customersProducts: ModelCustomersProducts[] = [];
  sub: Subscription[] = [];
  constructor(private formBuilder: FormBuilder, private cloudService: CloudService, private serverService: ServersService) { }


  receiveServerId(_serverId) {
    this.serverid = _serverId;
    this.loadCustomerProductsDatabase();
  }

  receivedCustomerId(_customerId) {
    this.customerId = _customerId;
  }

  loadCustomerProductsDatabase() {
    this.sub.push(
    this.cloudService.getCustomersProductsAllDatabases(this.serverid)
    .subscribe(customersProductsData => {
      this.customersProducts = customersProductsData;
    },
    erro => {
      alert('Erro ao carregar clientes com banco de dados');
    },
    () => {
      console.log('chamando get server ' + this.serverid);
      this.getServer(this.serverid);
    })
    );
  }

  getServer(serverId) {
    this.sub.push(
    this.serverService.getServer(serverId)
    .subscribe(serverIdData => {
      this.server = serverIdData;
    },
    erro => {
      alert('Erro ao carregar servidores');
    },
    () => {

    })
    );
  }

  initForm() {
    this.databaseForm = this.formBuilder.group({
      databasesId: [0],
      conteinerName: [],
      databaseName: [],
      memoryRam: [],
      storage: [],
      directory: [],
      databasesUserSa: ['sa'],
      databasePasswordSa: [],
      databasesUserCeltaBS: ['celtabsuser'],
      databasePasswordCeltaBS: []
    });
  }
  onSubmitDatabase() {
    // this.database = this.databaseForm.getRawValue();
    this.database.conteinerName = this.databaseForm.get('conteinerName').value;
    this.database.databaseName = this.databaseForm.get('databaseName').value;
    this.database.memoryRam = this.databaseForm.get('memoryRam').value;
    this.database.storage = this.databaseForm.get('storage').value;
    this.database.directory = this.databaseForm.get('directory').value;
    this.database.databaseUsers.push(
      this.databaseUser.Name = this.databaseForm.get('databasesUserSa').value,
      this.databaseUser.Password = this.databaseForm.get('databasePasswordSa').value);
    this.database.databaseUsers.push(
      this.databaseUser.Name = this.databaseForm.get('databasesUserCeltaBS').value,
      this.databaseUser.Password = this.databaseForm.get('databasePasswordCeltaBS').value);
    this.database.customersProductsId = this.customerId;

    this.sub.push(
      this.serverService.addDatabase(this.server.ipAddress + ':' + this.server.port, this.database)
      .subscribe(response => {
        console.log(response);
      },
      erro => {
        alert(erro.error);
      },
      () => {
        this.initForm();
      })
      );
    }

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges() {
    if (this.serverid > 0) {
      this.loadCustomerProductsDatabase();
    }
  }

  ngOnDestroy(): void {
    this.sub.forEach(s => s.unsubscribe());
  }

}
