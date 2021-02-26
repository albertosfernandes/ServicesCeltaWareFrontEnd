import { error } from 'protractor';
import { ModelBsf } from './../../../models/model-bsf';
import { Subscription } from 'rxjs';
import { ServiceBsfService } from './../../../services/service-bsf.service';
import { Component, OnInit, OnChanges, OnDestroy, SimpleChanges, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-bsf',
  templateUrl: './form-bsf.component.html',
  styleUrls: ['./form-bsf.component.css']
})
export class FormBsfComponent implements OnInit, OnChanges, OnDestroy {

  appBsfFormGroup: FormGroup;
  @Input() customersProductsId = 0;
  sub: Subscription[] = [];
  bsf: ModelBsf;

  constructor(private formBuilder: FormBuilder, private bsfService: ServiceBsfService) { }


  onSubmitFormBSF() {
    this.bsf = this.appBsfFormGroup.getRawValue();
    this.sub.push(
      this.bsfService.addBsf(this.bsf)
      .subscribe(resp => {
        console.log(resp);
      },
      err => {
        alert(err.error);
      },
      () => {
        this.initForm();
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
