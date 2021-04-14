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
  isReadToCreate = false;
  responseCreate: string;

  constructor(private formBuilder: FormBuilder, private bsfService: ServiceBsfService) { }


  onSubmitFormBSF() {
    this.bsf = this.appBsfFormGroup.getRawValue();
    this.sub.push(
      this.bsfService.addBsf(this.bsf)
      .subscribe(resp => {
        this.bsfId = resp;
      },
      err => {
        alert(err.error);
      },
      () => {
        this._bsfValue.emit(this.bsfId);
        alert('Gravado com sucesso com id:' + this.bsfId);
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
        // .
      })
    );
  }

  isShowCreateCloud(bsfValue: ModelBsf) {
   if (!this.bsf.isCreated) {
     this.isReadToCreate = true;
   }
  }

  loadBsfCustomerProduct () {
    this.sub.push(
      this.bsfService.findBsfbyCustomersProduct(this.customersProductsId)
      .subscribe(resp => {
        this.bsf = resp;
      },
      err => {
        alert(err.error);
      },
      () => {
        if (this.bsf == null || this.bsf === undefined ) {
          this.formEmpty();
        } else {
          this.formContent();
          this.isShowCreateCloud(this.bsf);
        }
      })
    );
  }

  initForm() {
    if (this.bsf == null || this.bsf === undefined) {
      this.formEmpty();
    } else {
      this.formContent();
    }
  }

  formEmpty() {
    this.appBsfFormGroup = this.formBuilder.group({
      customersProductsId: [this.customersProductsId],
      appBsfsId: 0,
      addressName: [],
      ipAddress: [],
      port: [],
      userName: [],
      password: [],
      installDirectory: []
    });
  }

  formContent() {
    this.appBsfFormGroup = this.formBuilder.group({
      customersProductsId: [this.customersProductsId],
      appBsfsId: [this.bsf.appBsfsId],
      addressName: [this.bsf.addressName],
      ipAddress: [this.bsf.ipAddress],
      port: [this.bsf.port],
      userName: [this.bsf.userName],
      password: [this.bsf.password],
      installDirectory: [this.bsf.installDirectory]
    });
  }

  onclickCreateCloud() {
    this.sub.push(
      this.bsfService.createBsfOncloud(this.bsf)
      .subscribe(resp => {
        console.log('criado nuvem BSF: ' + resp);
        this.responseCreate = resp;
      },
      err => {
        alert(err.error);
      },
      () => {
        alert('Criado com sucesso. ' + this.responseCreate);
      }
      )
    );
    alert('vms criar: ' + this.bsf.installDirectory + ' com id: ' + this.bsf.appBsfsId);
  }

  ngOnInit() {
    this.loadBsfCustomerProduct();
    // this.initForm();
  }

  ngOnDestroy(): void {
    this.sub.forEach(s => { s.unsubscribe();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadBsfCustomerProduct();
    // this.initForm();
  }

}
