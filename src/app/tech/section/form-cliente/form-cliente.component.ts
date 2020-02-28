import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { TechService } from '../../tech.service';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ModelCustomer } from 'src/app/models/model-customer';
import { CloudService } from 'src/app/cloud/cloud.service';

@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.css']
})
export class FormClienteComponent implements OnInit {

  customerFormGroup: FormGroup;
  customer: ModelCustomer;
  codeCeltaBs: number;
  valueSearch: string;
  isNew = false;
  isList = false;
  isLoading = false;
  customers: ModelCustomer[] = [];

  constructor(private techService: TechService, private formBuilder: FormBuilder, private cloudService: CloudService) { }

  onSubmitCustomer() {
    this.customer = this.customerFormGroup.getRawValue();
    console.log('chamando o service addProduto com valor: ' + this.customer);
     this.techService.addCustomer(this.customer)
    .subscribe(
      () => console.log('sucess...'),
      err => console.log('error: ' + err)
    );
  }

  loadForm() {
    this.customerFormGroup = this.formBuilder.group({
      customerId: [0],
      companyName: [],
      fantasyName: [],
      cnpj: [],
      codeCeltaBs: [],
      customersProducts: [],
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
      customersProducts: [customers.customersProducts],
      rootDirectory: [customers.rootDirectory]
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

    // this.codeCeltaBs =
    alert('PEsquisar' + codeCeltaBs);
  }

  btnNew() {
    this.isNew = !this.isNew;
  }

  // this.techService.addCustomer(this.customer)
  // .subscribe(
  //   () => console.log('sucess...'),
  //   err => console.log('error: ' + err)
  // );

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

  ngOnInit() {
    this.loadForm();
  }

}
