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

  constructor(private formBuilder: FormBuilder, private serviceConcentrator: ServiceConcentratorService) { }

  onSubmitFormConcentrator() {
    this.conc = this.concFormGroup.getRawValue();
    this.sub.push(
      this.serviceConcentrator.addConcentrator(this.conc)
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
    this.concFormGroup = this.formBuilder.group({
      customersProductsId: [this.customersProductsId],
      addressName: [],
      ipaddress: [],
      port: [],
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
