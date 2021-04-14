import { ModelServer } from 'src/app/models/model-server';
import { ModelCustomersProducts } from './../../../models/model-customersproducts';
import { ServiceCustomerProductService } from './../../../services/service-customer-product.service';
import { Component, OnInit, OnChanges, ViewChild, OnDestroy } from '@angular/core';
import { TechService } from '../../tech.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

import { ModelCustomer } from 'src/app/models/model-customer';
import { CloudService } from 'src/app/cloud/cloud.service';
import { ServersService } from '../servers/servers.service';


@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.css']
})
export class FormClienteComponent implements OnInit, OnChanges, OnDestroy {

  customerFormGroup: FormGroup;
  customer: ModelCustomer;
  server: ModelServer;
  customers: ModelCustomer[] = [];
  customerProductRoot: ModelCustomersProducts = new ModelCustomersProducts();
  codeCeltaBs: number;
  valueSearch: string;
  @ViewChild('searchCustomer') searchCustomer;
  @ViewChild('listProducts') listProducts;
  isNew = false;
  isList = false;
  isShowNewCloud = false;
  isLoading = false;
  isListCustomerProduct = false;
  isNewCustomerProduct = false;
  isBtnSearch = true;
  isCustomerCloud = false;
  customerId: any;
  isExecutingScript = false;
  sub: Subscription[] = [];
  debounce: Subject<string> = new Subject<string>();
  serverid: number;


  constructor(private techService: TechService, private formBuilder: FormBuilder, private cloudService: CloudService,
              private customerProductsService: ServiceCustomerProductService, private serverService: ServersService) { }

  onSubmitCustomer() {
    this.customer = this.customerFormGroup.getRawValue();
    this.customer.customerId = 0;
     this.techService.addCustomer(this.customer)
    .subscribe(customerIddata => {
        this.customerId = customerIddata;
      },
      err => {
        alert('Erro: ' + err);
    },
    () => {
      this.isExecutingScript = false;
      this.btnCancel();
    }
    );
  }


  loadForm() {
    this.customerFormGroup = this.formBuilder.group({
      customerId: [0],
      companyName: [],
      fantasyName: [],
      cnpj: [],
      codeCeltaBs: [],
      rootDirectory: []
    });
  }

  enableInputSearch() {
    this.debounce
    .pipe(debounceTime(300))
    .subscribe(filter => {
      if (filter === null || filter === undefined) {
        this.btnSearchCustomer('all');
      } else {
        this.btnSearchCustomer(filter);
      }
    },
    erro => {
      alert(erro.error);
    },
    () => {

    } );
  }

  populateForm(customers: ModelCustomer) {
    this.customerFormGroup = this.formBuilder.group({
      customerId: [customers.customerId],
      companyName: [customers.companyName],
      fantasyName: [customers.fantasyName],
      cnpj: [customers.cnpj],
      codeCeltaBs: [customers.codeCeltaBs],
      // customersProducts: [customers.customersProducts],
      rootDirectory: [customers.rootDirectory]
    });
  }

  clearForm() {
    this.customerFormGroup = this.formBuilder.group({
      customerId: [],
      companyName: [],
      fantasyName: [],
      cnpj: [],
      codeCeltaBs: [],
      rootDirectory: []
    });
  }


  btnSearchCustomer(codeCeltaBs) {
    if (codeCeltaBs === null || codeCeltaBs === undefined) {
      codeCeltaBs = 'all';
    }
    this.techService.findCustomer(codeCeltaBs)
    .subscribe(customerData => {
      this.customers = customerData;
    },
    error => {
      alert('Erro ao consultar cliente');
    },
    () => {
      this.isList = true;
      this.customers.forEach(c => {
        if (!c.isCloud) {
          this.isCustomerCloud = true;
        }
      });
    });
  }

  receiveServerId(_serverdIdValue) {
    this.serverid = _serverdIdValue;
    if (this.serverid == null || this.serverid === undefined) {
      alert('Servidor inválido');
    } else {
      this.sub.push(
        this.serverService.getServer(this.serverid)
        .subscribe(resp => {
          this.server = resp;
        },
        err => {
          alert(err.error);
        },
        () => {
          // fim.
        })
      );
    }
  }



  listenEventNewCustomerProduct(value) {
    this.isNewCustomerProduct = value;
  }

  listenVerifyCancel (value) {
    if (value) {
      this.isListCustomerProduct = false;
    }
  }
  //#region region Button events
  btnNew() {
    this.isNew = true;
    this.isBtnSearch = false;
    this.clearForm();
  }

  btnNewCloud(customer) {
    this.isLoading = true;
    if (this.server == null || this.server === undefined) {
      alert('Selecione um servidor.');
      this.isLoading = false;
    } else {
      this.sub.push(
        this.techService.createCustomer(customer, this.server)
        .subscribe(resp => {

        },
        err => {
          alert(err.error);
        },
        () => {
          this.isLoading = false;
        })
      );

    }
  }

   addCustomerProductRoot() {
    // this.customerProductRoot.server =
    //  this.sub.push(
    //    this.customerProductsService.addCustomerProduct()
    //  );
   }
  btnCancel() {
    this.isNew = false;
    this.isBtnSearch = true;
    this.searchCustomer.nativeElement.value = '';
    this.clearForm();
  }

  btnCancelList() {
    this.isList = false;
    this.isListCustomerProduct = false;
  }

  btnEdit(customerId) {
    this.techService.getCustomer(customerId)
    .subscribe(customerData => {
     this.customer = customerData;
    },
    err => {
      alert('Erro ao buscar cliente' + err);
    },
    () => {
      console.warn('valor customerId para listProducts' + this.customer.customerId);
      this.isListCustomerProduct = true;
      this.listProducts.nativeElement.scrollIntoView();
      this.isList = false;
    }
    );
  }

  btnListProducts(customerId) {
    this.isListCustomerProduct = !this.isListCustomerProduct;
  }

  btnAddProduct(customerId) {
    this.isNewCustomerProduct = !this.isNewCustomerProduct;
  }
  //#endregion

  ngOnInit() {
    this.loadForm();
    this.enableInputSearch();
  }

  ngOnChanges() {
    this.loadForm();
  }

  ngOnDestroy(): void {
    this.sub.forEach(s => {
      s.unsubscribe();
    });
  }

}
