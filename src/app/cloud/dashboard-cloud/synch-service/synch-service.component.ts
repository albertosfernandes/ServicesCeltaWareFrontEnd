import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CloudService } from '../../cloud.service';
import { ModelCustomersProducts } from 'src/app/models/model-customersproducts';

@Component({
  selector: 'app-synch-service',
  templateUrl: './synch-service.component.html',
  styleUrls: ['./synch-service.component.css']
})
export class SynchServiceComponent implements OnInit, OnChanges {

  @Input() customerProducts: ModelCustomersProducts = null;
  serviceBtnText: string;
  statusMessage: any;
  isUP = false;
  isUpdating = false;
  value: string;
  constructor(private cloudService: CloudService) { }

  changeStatus(isStart) {
    this.isUpdating = true;
    this.cloudService.getStartStopService(this.customerProducts.server, isStart, this.customerProducts.synchronizerServiceName)
    .subscribe(data => {
      // this.getStatusService(this.customerProducts.synchronizerServiceName);
    },
    error => {
      alert('error ' + error);
    },
    () => {this.isUpdating = false; this.getStatusService(this.customerProducts.synchronizerServiceName); }
    );
  }

  getStatusService(servicename) {
    console.log('chamou getStatusService');
    this.cloudService.getStatusService(servicename)
    .subscribe(message => {
      this.statusMessage = message;
      const s = this.statusMessage;
       if (s.indexOf('Running') !== -1) {
           this.isUP = true;
           this.serviceBtnText = 'Parar';
         } else {
          this.isUP = false;
         this.serviceBtnText = 'Iniciar';
        }
    });
  }


  ngOnInit() {
    console.log(this.customerProducts.synchronizerServiceName);
    this.getStatusService(this.customerProducts.synchronizerServiceName);
  }

  ngOnChanges() {
    console.log('ng change!!');
    this.getStatusService(this.customerProducts.synchronizerServiceName);
  }

}
