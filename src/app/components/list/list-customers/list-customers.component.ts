import { ModelCustomersProducts } from 'src/app/models/model-customersproducts';
import { CloudService } from 'src/app/cloud/cloud.service';
import { Component, OnInit, Output, OnChanges, EventEmitter, Input } from '@angular/core';
import { ModelCustomer } from 'src/app/models/model-customer';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.css']
})
export class ListCustomersComponent implements OnInit, OnChanges {

  customers: ModelCustomer[] = [];
  @Input() customersProductsInput: ModelCustomersProducts[] = [];
  @Output() eventCustomerId = new EventEmitter();
  isLoading = true;

  constructor(private cloudService: CloudService) { }

  loadCustomers() {
    this.cloudService.getCustomersAll()
    .subscribe(customersdata => {
      this.customers = customersdata;
    },
    error => {
      alert('Erro ao carregar clientes');
    },
    () => {
      this.isLoading = false;
    });
  }

  onChange(customerId) {
    this.eventCustomerId.emit(customerId);
  }

  ngOnInit() {
    this.loadCustomers();
  }

  ngOnChanges() {

  }

}
