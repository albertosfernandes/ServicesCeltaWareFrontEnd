import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CloudService } from '../../cloud.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  messageResult: string;
  constructor(private cloudService: CloudService) { }

  _executeRepair(_valueCustomerProductId, _element) {
    return this.cloudService.getRepairDatabase(_valueCustomerProductId)
        .subscribe(result => {

        });
  }

  executeRepair(_valueCustomerProductId, _element) {
    this.cloudService.getRepairDatabase(_valueCustomerProductId)
    .subscribe(result => {
       this.messageResult = result;
    },
    error => {
      alert('Erro durante execução. Repair');
    },
    () => {
     return this.messageResult;
    });
  }

  executeCreate(_valueCustomerProductId, _element) {
    this.cloudService.getCreateDatabase(_valueCustomerProductId, _element)
    .subscribe(result => {
      this.messageResult = result;
    },
    error => {
      alert('Erro durante execução. Create');
    },
    () => {
      return this.messageResult;
    });
  }
}
