import { Component, Input, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ModelSincservices } from 'src/app/models/model-sincservices';
import { ServiceSincServiceService } from 'src/app/services/service-sinc-service.service';

@Component({
  selector: 'app-form-sincservices',
  templateUrl: './form-sincservices.component.html',
  styleUrls: ['./form-sincservices.component.css']
})
export class FormSincservicesComponent implements OnInit, OnChanges, OnDestroy {

  sincServicesFormGroup: FormGroup;
  @Input() customersProductsId = 0;
  sub: Subscription[] = [];
  sincService: ModelSincservices;
  idresp: string;
  constructor(private formBuilder: FormBuilder, private sincServiceService: ServiceSincServiceService) { }

  onSubmitFormSincServices() {
    this.sincService = this.sincServicesFormGroup.getRawValue();
    this.sub.push(
      this.sincServiceService.addSincService(this.sincService)
      .subscribe(resp => {
        this.idresp = resp;
      },
      err => {
        alert(err.error);
      },
      () => {
        alert('Gravado com sucesso com id:' + this.idresp);
      })
    );
  }

  loadSincServiceCustomerProduct () {
    this.sub.push(
      this.sincServiceService.findSincServicebyCustomersProduct(this.customersProductsId)
      .subscribe(resp => {
        this.sincService = resp;
      },
      err => {
        alert(err.error);
      },
      () => {
        if (this.sincService == null || this.sincService === undefined ) {
          this.formEmpty();
        } else {
          this.formContent();
        }
      })
    );
  }

  initForm() {
    // this.sincServicesFormGroup = this.formBuilder.group({
    //   customersProductsId: [this.customersProductsId],
    //   addressName: [],
    //   ipaddress: [],
    //   port: [],
    //   synchronizerServiceName: [],
    //   installDirectory: []
    // });
  }

  formEmpty() {
    this.sincServicesFormGroup = this.formBuilder.group({
      customersProductsId: [this.customersProductsId],
      appSincServicesId: [0],
      addressName: [],
      ipAddress: [],
      port: [],
      synchronizerServiceName: [],
      installDirectory: []
    });
  }

  formContent() {
    this.sincServicesFormGroup = this.formBuilder.group({
      customersProductsId: [this.customersProductsId],
      appSincServicesId: [this.sincService.appSincServicesId],
      addressName: [this.sincService.addressName],
      ipAddress: [this.sincService.ipAddress],
      port: [this.sincService.port],
      synchronizerServiceName: [this.sincService.synchronizerServiceName],
      installDirectory: [this.sincService.installDirectory]
    });
  }

  ngOnInit() {
    this.loadSincServiceCustomerProduct();
  }

  ngOnDestroy(): void {
    this.sub.forEach(s => { s.unsubscribe();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadSincServiceCustomerProduct();
  }

}
