import { ModelConcentrator } from './../../../models/model-concentrator';
import { Component, Input, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ServiceConcentratorService } from 'src/app/services/service-concentrator.service';

@Component({
  selector: 'app-form-concentrator',
  templateUrl: './form-concentrator.component.html',
  styleUrls: ['./form-concentrator.component.css']
})
export class FormConcentratorComponent implements OnInit, OnChanges, OnDestroy {

  concFormGroup: FormGroup;
  @Input() customersProductsId = 0;
  sub: Subscription[] = [];
  conc: ModelConcentrator;
  idresp: string;

  constructor(private formBuilder: FormBuilder, private serviceConcentrator: ServiceConcentratorService) { }

  onSubmitFormConcentrator() {
    this.conc = this.concFormGroup.getRawValue();
    this.sub.push(
      this.serviceConcentrator.addConcentrator(this.conc)
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

  loadConcentratorCustomerProduct () {
    this.sub.push(
      this.serviceConcentrator.findConcentratorbyCustomersProduct(this.customersProductsId)
      .subscribe(resp => {
        this.conc = resp;
      },
      err => {
        alert(err.error);
      },
      () => {
        if (this.conc == null || this.conc === undefined ) {
          this.formEmpty();
        } else {
          this.formContent();
        }
      })
    );
  }

  initForm() {
    // this.concFormGroup = this.formBuilder.group({
    //   customersProductsId: [this.customersProductsId],
    //   addressName: [],
    //   ipaddress: [],
    //   port: [],
    //   installDirectory: []
    // });
  }

  formEmpty() {
    this.concFormGroup = this.formBuilder.group({
      customersProductsId: [this.customersProductsId],
      concentratorsId: [0],
      addressName: [],
      ipaddress: [],
      port: [],
      installDirectory: []
    });
  }

  formContent() {
    this.concFormGroup = this.formBuilder.group({
      customersProductsId: [this.customersProductsId],
      concentratorsId: [this.conc.concentratorsId],
      addressName: [this.conc.addressName],
      ipaddress: [this.conc.ipAddress],
      port: [this.conc.port],
      installDirectory: [this.conc.installDirectory]
    });
  }

  ngOnInit() {
    this.loadConcentratorCustomerProduct();
  }

  ngOnDestroy(): void {
    this.sub.forEach(s => { s.unsubscribe();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadConcentratorCustomerProduct();
  }

}
