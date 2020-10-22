import { Observable, Subject } from 'rxjs';
import { element } from 'protractor';
import { CloudService } from 'src/app/cloud/cloud.service';
import { Component, OnInit, Input } from '@angular/core';
import { ModelCustomersProducts } from 'src/app/models/model-customersproducts';
import { DatabaseService } from './database.service';

@Component({
  selector: 'app-database-service',
  templateUrl: './database-service.component.html',
  styleUrls: ['./database-service.component.css']
})
export class DatabaseServiceComponent implements OnInit {

  @Input() customerProducts: ModelCustomersProducts = null;
  @Input() updateDatabaseNow;
  isUpdating = false;
  isError =  false;
  isExecutingScript = false;
  message = 'nenhuhma informação';
  _datas: any;
  statusMessage = 'Aguardando início da execução';
  messageError = 'nenhum erro';
  resultScript = '';
  tasksUpdateDatabase: any = [
    'Repair',
    'Create\\Functions',
    'Create\\Constrain',
    'Create\\Views',
    'Create\\Views\\CeltaAnalytics',
    'Create\\Views\\PlugSales',
    'Create\\Views\\Yandeh',
    'Create\\Procedures',
    'Create\\BSmessages',
    'Create\\Triggers'
  ];
  tasksUpdateDatabaseInRunning: any[] = [];
  private scriptReady = new Subject();
  teste: any;

  constructor(private databaseService: DatabaseService, private cloudService: CloudService) { }

  // 1
   click_updateDatabase(valueCustomerProductId) {
    this.isExecutingScript = true;
    this.message = 'Executando Repair';
      this.teste = this.cloudService.getRepairDatabase(valueCustomerProductId)
      .subscribe(result => {
         this.resultScript = result;
      },
      error => {
        alert('Erro durante execução. Repair');
        this.addTasksUpdateDatabaseInRunning('Repair');
        this.isError = true;
        this.isExecutingScript = false;
        this.resultScript = error.error;
      },
      () => {
        this.addTasksUpdateDatabaseInRunning('Repair');
        // this.message = 'Executando Create\\Functions';
        this.executeCreateFunctions(valueCustomerProductId);
     });
  }


  click_repairDatabase(_customersProductsId) {
    this.isError = false;
    this.tasksUpdateDatabaseInRunning = [];
    this.isExecutingScript = true;
    this.executeRepair(_customersProductsId);
  }

  click_createDatabase(_customersProductsId) {
    this.isError = false;
    this.tasksUpdateDatabaseInRunning = [];
    this.isExecutingScript = true;
    this.executeCreateFunctions(_customersProductsId);
  }

  click_createBsMessages(_customersProductsId) {
    this.isError = false;
    this.tasksUpdateDatabaseInRunning = [];
    this.isExecutingScript = true;
    // this.executeCreateFunctions(_customersProductsId);
    this.executeCreateBSmessages(_customersProductsId);
  }

  addTasksUpdateDatabaseInRunning(taskValue) {
    this.tasksUpdateDatabaseInRunning.push(taskValue);
  }

  executeRepair(_valueCustomerProductId) {
    this.isExecutingScript = true;
    this.message = 'Executando Repair';
      this.teste = this.cloudService.getRepairDatabase(_valueCustomerProductId)
      .subscribe(result => {
         this.resultScript = result;
      },
      error => {
        alert('Erro durante execução. Repair');
        this.addTasksUpdateDatabaseInRunning('Repair');
        this.isError = true;
        this.isExecutingScript = false;
        this.resultScript = error.error;
      },
      () => {
        this.isExecutingScript = false;
        this.addTasksUpdateDatabaseInRunning('Repair');
     });
  }

  executeCreate(_valueCustomerProductId, _element) {
    this.message = 'Executando ' + _element;
    this.cloudService.getCreateDatabase(_valueCustomerProductId, _element)
    .subscribe(result => {
      this.resultScript = result;
      this.message = 'Executando ' + _element;
    },
    error => {
      alert('Erro durante execução. Create');
      this.resultScript = error;
      console.log('erro create: ' + error);
      this.addTasksUpdateDatabaseInRunning(_element);
      this.isError = true;
      this.isExecutingScript = false;
    },
    () => {
      this.addTasksUpdateDatabaseInRunning(_element);
    });
  }

  executeCreateAll(_valueCustomerProductId, _element) {
    this.teste = this.cloudService.getCreateDatabase(_valueCustomerProductId, _element)
    .subscribe(result => {
      this.resultScript = result;
    },
    error => {
      alert('Erro durante execução. Create ' + error );
      this.addTasksUpdateDatabaseInRunning(_element);
      this.isError = true;
      this.isExecutingScript = false;
    },
    () => {
      this.addTasksUpdateDatabaseInRunning(_element);

      for (let index = 2; index < this.tasksUpdateDatabase.length; index++) {
        // tslint:disable-next-line: no-shadowed-variable
        const element = this.tasksUpdateDatabase[index];
        this.executeCreateAll(_valueCustomerProductId, element);
        }
    });
  }

  ngOnInit() {
    console.log('Carregou database component');
    this.click_updateDatabase(this.customerProducts.customersProductsId);
  }


  click_teste(value) {
    this.cloudService.testeBody(value)
    .subscribe(result => {

    },
    error => {
      console.log('Aqui o erro no component. ' + error.error );
      this.messageError = error.error;
    },
    () => console.log('fim'));
  }

  // 'Repair', 1
  // 'Create\\Functions', 2
  // 'Create\\Constraints', 3
  // 'Create\\Views', 4
  // 'Create\\Views\\CeltaAnalytics', 5
  // 'Create\\Views\\PlugSales', 6
  // 'Create\\Views\\Yandeh', 7
  // 'Create\\Procedures', 8
  // 'Create\\BSmessages', 9
  // 'Create\\Triggers' 10

  // 2
  executeCreateFunctions(valueCustomerProductId) {
    this.message = 'Executando Create\\Functions';
      this.teste = this.cloudService.getCreateDatabase(valueCustomerProductId, 'Create\\Functions')
      .subscribe(result => {
         this.resultScript = result;
      },
      error => {
        alert('Erro durante execução. Create\\Functions');
        this.addTasksUpdateDatabaseInRunning('Create\\Functions');
        this.isError = true;
        this.isExecutingScript = false;
        this.resultScript = error.error;
      },
      () => {
        this.addTasksUpdateDatabaseInRunning('Create\\Functions');
        // this.message = 'Executando Create\\Functions';
        this.executeCreateConstraints(valueCustomerProductId);
     });
  }

  // 3
  executeCreateConstraints(valueCustomerProductId) {
    this.message = 'Executando Create\\Constraints';
      this.teste = this.cloudService.getCreateDatabase(valueCustomerProductId, 'Create\\Constraints')
      .subscribe(result => {
         this.resultScript = result;
      },
      error => {
        alert('Erro durante execução. Create\\Constraints');
        this.addTasksUpdateDatabaseInRunning('Create\\Constraints');
        this.isError = true;
        this.isExecutingScript = false;
        this.resultScript = error.error;
      },
      () => {
        this.addTasksUpdateDatabaseInRunning('Create\\Constraints');
        // this.message = 'Executando Create\\Constraints';
        this.executeCreateViews(valueCustomerProductId);
     });
  }

// 4
executeCreateViews(valueCustomerProductId) {
  this.message = 'Executando Create\\Views';
    this.teste = this.cloudService.getCreateDatabase(valueCustomerProductId, 'Create\\Views')
    .subscribe(result => {
       this.resultScript = result;
    },
    error => {
      alert('Erro durante execução. Create\\Views');
      this.addTasksUpdateDatabaseInRunning('Create\\Views');
      this.isError = true;
      this.isExecutingScript = false;
      this.resultScript = error.error;
    },
    () => {
      this.addTasksUpdateDatabaseInRunning('Create\\Views');
      // this.message = 'Executando Create\\Views';
      this.executeCreateViewsCeltaAnalytics(valueCustomerProductId);
   });
  }

  // 5
  executeCreateViewsCeltaAnalytics(valueCustomerProductId) {
    this.message = 'Executando Create\\Views\\CeltaAnalytics';
      this.teste = this.cloudService.getCreateDatabase(valueCustomerProductId, 'Create\\Views\\CeltaAnalytics')
      .subscribe(result => {
         this.resultScript = result;
      },
      error => {
        alert('Erro durante execução. Create\\Views\\CeltaAnalytics');
        this.addTasksUpdateDatabaseInRunning('Create\\Views\\CeltaAnalytics');
        this.isError = true;
        this.isExecutingScript = false;
        this.resultScript = error.error;
      },
      () => {
        this.addTasksUpdateDatabaseInRunning('Create\\Views\\CeltaAnalytics');
        // this.message = 'Executando Create\\Views';
        this.executeCreateViewsPlugSales(valueCustomerProductId);
     });
  }

   // 6
   executeCreateViewsPlugSales(valueCustomerProductId) {
    this.message = 'Executando Create\\Views\\PlugSales';
      this.teste = this.cloudService.getCreateDatabase(valueCustomerProductId, 'Create\\Views\\PlugSales')
      .subscribe(result => {
         this.resultScript = result;
      },
      error => {
        alert('Erro durante execução. Create\\Views\\PlugSales');
        this.addTasksUpdateDatabaseInRunning('Create\\Views\\PlugSales');
        this.isError = true;
        this.isExecutingScript = false;
        this.resultScript = error.error;
      },
      () => {
        this.addTasksUpdateDatabaseInRunning('Create\\Views\\PlugSales');
        // this.message = 'Executando Create\\Views';
        this.executeCreateViewsYandeh(valueCustomerProductId);
     });
  }

  // 7
  executeCreateViewsYandeh(valueCustomerProductId) {
    this.message = 'Executando Create\\Views\\Yandeh';
      this.teste = this.cloudService.getCreateDatabase(valueCustomerProductId, 'Create\\Views\\Yandeh')
      .subscribe(result => {
         this.resultScript = result;
      },
      error => {
        alert('Erro durante execução. Create\\Views\\Yandeh');
        this.addTasksUpdateDatabaseInRunning('Create\\Views\\Yandeh');
        this.isError = true;
        this.isExecutingScript = false;
        this.resultScript = error.error;
      },
      () => {
        this.addTasksUpdateDatabaseInRunning('Create\\Views\\Yandeh');
        // this.message = 'Executando Create\\Views';
        this.executeCreateProcedures(valueCustomerProductId);
     });
  }

  // 8
  executeCreateProcedures(valueCustomerProductId) {
    this.message = 'Executando Create\\Procedures';
      this.teste = this.cloudService.getCreateDatabase(valueCustomerProductId, 'Create\\Procedures')
      .subscribe(result => {
         this.resultScript = result;
      },
      error => {
        alert('Erro durante execução. Create\\Procedures');
        this.addTasksUpdateDatabaseInRunning('Create\\Procedures');
        this.isError = true;
        this.isExecutingScript = false;
        this.resultScript = error.error;
      },
      () => {
        this.addTasksUpdateDatabaseInRunning('Create\\Procedures');
        // this.message = 'Executando Create\\Views';
        this.executeCreateBSmessages(valueCustomerProductId);
     });
  }

  // 9
  executeCreateBSmessages(valueCustomerProductId) {
    this.message = 'Executando Create\\BSmessages';
      this.teste = this.cloudService.getCreateDatabase(valueCustomerProductId, 'Create\\BSmessages')
      .subscribe(result => {
         this.resultScript = result;
      },
      error => {
        alert('Erro durante execução. Create\\BSmessages');
        this.addTasksUpdateDatabaseInRunning('Create\\BSmessages');
        this.isError = true;
        this.isExecutingScript = false;
        this.resultScript = error.error;
      },
      () => {
        this.addTasksUpdateDatabaseInRunning('Create\\BSmessages');
        // this.message = 'Executando Create\\Views';
        this.executeCreateTriggers(valueCustomerProductId);
     });
  }

  // 10
  executeCreateTriggers(valueCustomerProductId) {
    this.message = 'Executando Create\\Triggers';
      this.teste = this.cloudService.getCreateDatabase(valueCustomerProductId, 'Create\\Triggers')
      .subscribe(result => {
         this.resultScript = result;
      },
      error => {
        alert('Erro durante execução. Create\\Triggers');
        this.addTasksUpdateDatabaseInRunning('Create\\Triggers');
        this.isError = true;
        this.isExecutingScript = false;
        this.resultScript = error.error;
      },
      () => {
        this.addTasksUpdateDatabaseInRunning('Create\\Triggers');
        this.isExecutingScript = false;
        alert('Fim');
     });
  }

}
