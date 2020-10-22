import { Component, OnInit, OnChanges } from '@angular/core';
import { TechService } from '../../tech.service';
import { FormBuilder, FormGroup } from '@angular/forms';
// import { mergeMap, switchMap, retry, map, catchError, filter, scan } from 'rxjs/operators';

import { ModelCustomer } from 'src/app/models/model-customer';
import { CloudService } from 'src/app/cloud/cloud.service';


@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.css']
})
export class FormClienteComponent implements OnInit, OnChanges {

  customerFormGroup: FormGroup;
  customer: ModelCustomer;
  codeCeltaBs: number;
  valueSearch: string;
  isNew = false;
  isList = false;
  isLoading = false;
  isListCustomerProduct = false;
  isNewCustomerProduct = false;
  isBtnSearch = true;
  customers: ModelCustomer[] = [];
  produto = 'testesss';
  customerId: any;
  isExecutingScript = false;


  constructor(private techService: TechService, private formBuilder: FormBuilder, private cloudService: CloudService) { }

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
      this.isExecutingScript = true;
      this.loadCustomerCreate(this.customerId);
    }
    );
  }

  loadCustomerCreate(customerId) {
    this.techService.getCustomer(customerId)
    .subscribe(customer => {
      this.customer = customer;
    },
    error => {
      alert('Erro: ' + error);
    },
    () => {
      this.createCustomerCloud(this.customer);
    } );
  }

  createCustomerCloud(customer) {
    this.techService.createCustomer(customer)
    .subscribe(data => {
      console.log('Criado com sucesso.');
    },
    error => {
      alert('Erro:' + error);
    },
    () => {
      this.isExecutingScript = false;
    });
  }

  createCustomerProduct(_customer) {
    this.techService.createCustomerProduct(_customer)
    .subscribe(data => {
      console.log('Criado com sucesso.');
    },
    error => {
      alert('Erro:' + error);
    },
    () => {

    });
  }

  loadForm() {
    this.customerFormGroup = this.formBuilder.group({
      customerId: [0],
      companyName: [],
      fantasyName: [],
      cnpj: [],
      codeCeltaBs: [],
      // customersProducts: [],
      rootDirectory: []
    });
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
      // customersProducts: [],
      rootDirectory: []
    });
  }

  getAllCustomers() {
    this.isLoading = true;
    this.cloudService.getCustomersAll()
    .subscribe(customerArray => {
      this.customers = customerArray;
    },
    error => {
      alert('error ');
    },
    () => {
      this.isLoading = false;
      this.isList = true;
      this.isNew = !this.isNew;
    } );
  }

  btnSearchCustomer(codeCeltaBs) {
    alert('PEsquisar' + codeCeltaBs);
    this.techService.findCustomer(codeCeltaBs)
    .subscribe(customerData => {
      this.customer = customerData;
      console.log(customerData);
    },
    error => {
      alert('Erro ao consultar cliente');
    },
    () => {
      this.isNew = !this.isNew;
      this.isBtnSearch = !this.isBtnSearch;
      this.populateForm(this.customer);
    });
  }

  btnNew() {
    this.isNew = !this.isNew;
    this.isBtnSearch = !this.isBtnSearch;
    this.clearForm();
  }

  btnCancelList() {
    this.isList = !this.isList;
    this.isNew = !this.isNew;
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
      this.populateForm(this.customer);
      console.log('finish');
    }
    );
  }

  btnListProducts(customerId) {
    this.isListCustomerProduct = !this.isListCustomerProduct;
  }

  btnAddProduct(customerId) {
    this.isNewCustomerProduct = !this.isNewCustomerProduct;
  }

  ngOnInit() {
    this.loadForm();
  }

  ngOnChanges() {
    this.loadForm();
  }

}
