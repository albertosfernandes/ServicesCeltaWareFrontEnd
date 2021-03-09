import { ServiceCrossService } from './../../../services/service-cross.service';
import { ModelCross } from './../../../models/model-cross';
import { Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-cross',
  templateUrl: './form-cross.component.html',
  styleUrls: ['./form-cross.component.css']
})
export class FormCrossComponent implements OnInit, OnChanges, OnDestroy {

  appCrossFormGroup: FormGroup;
  @Input() customersProductsId = 0;
  sub: Subscription[] = [];
  cross: ModelCross;
  idresp: string;

  constructor(private formBuilder: FormBuilder, private crossService: ServiceCrossService) { }

  onSubmitFormCross() {
    this.cross = this.appCrossFormGroup.getRawValue();
    this.sub.push(
      this.crossService.addCross(this.cross)
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

  loadCrossCustomerProduct () {
    this.sub.push(
      this.crossService.findCrossbyCustomersProduct(this.customersProductsId)
      .subscribe(resp => {
        this.cross = resp;
      },
      err => {
        alert(err.error);
      },
      () => {
        if (this.cross == null || this.cross === undefined ) {
          this.formEmpty();
        } else {
          this.formContent();
        }
      })
    );
  }

  initForm() {
    // this.appCrossFormGroup = this.formBuilder.group({
    //   customersProductsId: [this.customersProductsId],
    //   addressName: [],
    //   ipAddress: [],
    //   port: [],
    //   installDirectory: []
    // });
  }
  formEmpty() {
    this.appCrossFormGroup = this.formBuilder.group({
      customersProductsId: [this.customersProductsId],
      appCrossId: [0],
      addressName: [],
      ipAddress: [],
      port: [],
      installDirectory: []
    });
  }

  formContent() {
    this.appCrossFormGroup = this.formBuilder.group({
      customersProductsId: [this.customersProductsId],
      appCrossId: [this.cross.appCrossId],
      addressName: [this.cross.addressName],
      ipAddress: [this.cross.ipAddress],
      port: [this.cross.port],
      installDirectory: [this.cross.installDirectory]
    });
  }

  ngOnInit() {
    this.loadCrossCustomerProduct();
    // this.initForm();
  }

  ngOnDestroy(): void {
    this.sub.forEach(s => { s.unsubscribe();
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.loadCrossCustomerProduct();
    // this.initForm();
  }

}
