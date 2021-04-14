import { ServiceDatabaseService } from './../../../services/service-database.service';
import { ModelStorageServer } from './../../../models/ModelStorageServer';
import { error } from 'protractor';
import { ServiceStorageService } from './../../../services/service-storage.service';
import { ModelDatabaseUser } from './../../../models/ModelDatabaseUser';
import { Subscription } from 'rxjs';
import { ModelServer } from './../../../models/model-server';
import { ServersService } from './../servers/servers.service';
import { ModelDatabase } from './../../../models/model-database';
import { CloudService } from 'src/app/cloud/cloud.service';
import { ModelCustomersProducts } from 'src/app/models/model-customersproducts';
import { FormBuilder, FormGroup, FormGroupName } from '@angular/forms';
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
  customersProducts: ModelCustomersProducts[] = [];
  sub: Subscription[] = [];
  serversStorageId: any[] = [];
  serversStorage: ModelServer[] = [];
  storageServer: ModelStorageServer;
  databaseUsers: ModelDatabaseUser[] = [];
  isShowStorages = false;
  isShowPassword = false;
  isReadToSend = true;
  serverIdSelected = 0;
  storageServerId = 0;
  constructor(private formBuilder: FormBuilder, private cloudService: CloudService, private serverService: ServersService,
              private storageService: ServiceStorageService, private databaseService: ServiceDatabaseService) { }


  receiveServerId(_serverId) {
    this.serverid = _serverId;
    this.loadCustomerProductsDatabase();
  }

  receivedCustomerId(_customerId) {
    this.customerId = _customerId;
  }

  receivedStorageServerId (storageServerIdValue) {
    if (storageServerIdValue > 0) {
      this.storageServerId = storageServerIdValue;
      this.getStorageServer(storageServerIdValue);
      this.isReadToSend = false;
    } else {
      console.error('storageServerValue é nulo!');
    }
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

  loadStorageServers () {
    this.sub.push(
      this.serverService.getServersStorage()
      .subscribe(resp => {
        this.serversStorage = resp;
      },
      err => {
        alert(err.error);
      },
      () => {
        // .
      })
    );
  }

  async loadDatabase() {
    this.sub.push(
      this.databaseService.getDatabase(this.server.ipAddress + ':' + this.server.port, this.customersProducts[0].customersProductsId)
      .subscribe(resp => {
        this.database = resp;
      },
      err => {
        alert(err.error);
      },
      () => {
        // .
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
      this.loadStorageServers();
    })
    );
  }

  getStorageServer(_storageServerId) {
    this.sub.push(
      this.storageService.get(_storageServerId)
      .subscribe(resp => {
        this.storageServer = resp;
      },
      err => {
        alert(err.error);
      },
      () => {
        // fim
      })
    );
  }

  selectIsOpen(selectedStorageId) {
    // trazer todos storages desse ID
    this.serverIdSelected = selectedStorageId;
    this.isShowStorages = true;
  }


  initForm() {
    this.databaseForm = this.formBuilder.group({
      databasesId: [0],
      conteinerName: [],
      databaseName: [],
      memoryRam: [],
      storage: [],
      directory: []
    });
  }

  async onSubmitDatabase() {
    // this.database = this.databaseForm.getRawValue();
    this.database.conteinerName = this.databaseForm.get('conteinerName').value;
    this.database.databaseName = this.databaseForm.get('databaseName').value;
    this.database.memoryRam = this.databaseForm.get('memoryRam').value;
    this.database.storage = this.databaseForm.get('storage').value;
    this.database.directory = this.databaseForm.get('directory').value;



    // this.databaseUser.Name = this.databaseForm.get('databasesUserCeltaBS').value,
    // this.databaseUser.Password = this.databaseForm.get('databasePasswordCeltaBS').value;
    // this.databaseUser.DatabasesId = 0;
    // this.databaseUser.DatabasesUsersId = 0;

    // this.databaseUsers.push(this.databaseUser);

    this.database.databaseUsers = this.databaseUsers;
    this.database.customersProductsId = this.customerId;
    this.database.storageServerId = this.storageServer.storageServerId;

    this.sub.push(
      this.databaseService.addDatabase(this.server.ipAddress + ':' + this.server.port, this.database)
      .subscribe(response => {
        console.log(response);
      },
      erro => {
        alert(erro.error);
      },
      () => {
        this.valideShowPassword();
      })
      );
    }

    async valideShowPassword() {
      await this.loadDatabase();
      this.isShowPassword = true;
      // this.initForm();
    }

    // updatePassword() {
    // this.databaseUser.Name = this.databaseForm.get('databasesUserSa').value;
    // this.databaseUser.Password = this.databaseForm.get('databasePasswordSa').value;
    // this.databaseUser.DatabasesId = 0;
    // this.databaseUser.DatabasesUsersId = 0;
    // this.databaseUsers.push(this.databaseUser);

    // }

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
