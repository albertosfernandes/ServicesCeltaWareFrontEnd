import { Component, OnInit, OnChanges } from '@angular/core';
import { ModelCustomer } from 'src/app/models/model-customer';
import { CloudService } from '../cloud.service';

@Component({
  selector: 'app-menu-cloud',
  templateUrl: './menu-cloud.component.html',
  styleUrls: ['./menu-cloud.component.css']
})
export class MenuCloudComponent implements OnInit, OnChanges {
 

  customers: ModelCustomer[] = [];
  customerSelected: string = "nulo";
  
  constructor(private cloudService: CloudService) { }

  loadCustomers(){    
    this.cloudService.getCustomersAll()
    .subscribe(customerArray => {      
      this.customers = customerArray;      
    })        
  }

  onChangeCustomer(){
    console.log("Mudei o select: ")
  }

  onChange(deviceValue) {
    console.log(deviceValue);
}

  ngOnInit() {
    this.loadCustomers();
  }

  ngOnChanges() {
    this.onChangeCustomer();
  }

}
