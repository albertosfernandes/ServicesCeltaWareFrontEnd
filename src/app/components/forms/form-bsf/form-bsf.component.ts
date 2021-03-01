import { error } from 'protractor';
import { ModelBsf } from './../../../models/model-bsf';
import { Subscription } from 'rxjs';
import { ServiceBsfService } from './../../../services/service-bsf.service';
import { Component, OnInit, OnChanges, OnDestroy, SimpleChanges, Input, Output , EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-bsf',
  templateUrl: './form-bsf.component.html',
  styleUrls: ['./form-bsf.component.css']
})
export class FormBsfComponent implements OnInit, OnChanges, OnDestroy {

  appBsfFormGroup: FormGroup;
  @Input() customersProductsId = 0;
  @Input() customerId = 0;
  @Output() _bsfValue = new EventEmitter();
  sub: Subscription[] = [];
  bsf: ModelBsf;
  bsfId;
  _bsfCustomerProducts: ModelBsf[] = [];

  constructor(private formBuilder: FormBuilder, private bsfService: ServiceBsfService) { }


  onSubmitFormBSF() {
    this.bsf = this.appBsfFormGroup.getRawValue();
    this.sub.push(
      this.bsfService.addBsf(this.bsf)
      .subscribe(resp => {
        this.bsfId = resp;
        console.log('Resposta de submitFormBSF: ' + resp);
      },
      err => {
        alert(err.error);
      },
      () => {
        this._bsfValue.emit(this.bsfId);
        this.initForm();
      })
    );
  }

  onclickCreate(_appBsf) {
    this.sub.push(
      this.bsfService.createBsfOncloud(_appBsf)
      .subscribe(resp => {
        console.log(resp);
      },
      err => {
        alert(err.error);
      },
      () => {
        this.loadBsfCustomerProducts();
      })
    );
  }

  loadBsfCustomerProducts () {
    this.sub.push(
      this.bsfService.get(this.customerId)
      .subscribe(resp => {
        this._bsfCustomerProducts = resp;
      },
      err => {
        alert(err.error);
      },
      () => {
        // fim
      })
    );
  }

  initForm() {
    this.appBsfFormGroup = this.formBuilder.group({
      customersProductsId: [this.customersProductsId],
      addressName: [],
      ipAddress: [],
      port: [],
      userName: [],
      password: [],
      installDirectory: []
    });
  }

  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.sub.forEach(s => { s.unsubscribe();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initForm();
  }

}
