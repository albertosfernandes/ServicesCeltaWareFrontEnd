import { ServiceSincwebService } from './../../../services/service-sincweb.service';
import { Component, OnInit, OnChanges, OnDestroy, SimpleChanges, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ModelSincweb } from 'src/app/models/model-sincweb';

@Component({
  selector: 'app-form-sincweb',
  templateUrl: './form-sincweb.component.html',
  styleUrls: ['./form-sincweb.component.css']
})
export class FormSincwebComponent implements OnInit, OnChanges, OnDestroy {

  sincWebFormGroup: FormGroup;
  @Input() customersProductsId = 0;
  sub: Subscription[] = [];
  sincWeb: ModelSincweb;
  idresp: string;

  constructor(private formBuilder: FormBuilder, private sincWebService: ServiceSincwebService) { }

  onSubmitFormSincWeb() {
    this.sincWeb = this.sincWebFormGroup.getRawValue();
    this.sub.push(
      this.sincWebService.addSincWeb(this.sincWeb)
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

  loadSincWebCustomerProduct () {
    this.sub.push(
      this.sincWebService.findSincWebbyCustomersProduct(this.customersProductsId)
      .subscribe(resp => {
        this.sincWeb = resp;
      },
      err => {
        alert(err.error);
      },
      () => {
        if (this.sincWeb == null || this.sincWeb === undefined ) {
          this.formEmpty();
        } else {
          this.formContent();
        }
      })
    );
  }
  initForm() {
    // this.sincWebFormGroup = this.formBuilder.group({
    //   customersProductsId: [this.customersProductsId],
    //   addressName: [],
    //   ipaddress: [],
    //   port: [],
    //   installDirectory: []
    // });
  }

  formEmpty() {
    this.sincWebFormGroup = this.formBuilder.group({
      customersProductsId: [this.customersProductsId],
      appSincWebsId: [0],
      addressName: [],
      ipaddress: [],
      port: [],
      installDirectory: []
    });
  }

  formContent() {
    this.sincWebFormGroup = this.formBuilder.group({
      customersProductsId: [this.customersProductsId],
      appSincWebsId: [this.sincWeb.appSincWebsId],
      addressName: [this.sincWeb.addressName],
      ipaddress: [this.sincWeb.ipAddress],
      port: [this.sincWeb.port],
      installDirectory: [this.sincWeb.installDirectory]
    });
  }

  ngOnInit() {
    // this.initForm();
    this.loadSincWebCustomerProduct();
  }
  ngOnDestroy(): void {
    this.sub.forEach(s => { s.unsubscribe();
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    // this.initForm();
    this.loadSincWebCustomerProduct();
  }

}
