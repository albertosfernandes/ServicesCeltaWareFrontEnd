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
  constructor(private formBuilder: FormBuilder, private sincServiceService: ServiceSincServiceService) { }

  onSubmitFormSincServices() {
    this.sincService = this.sincServicesFormGroup.getRawValue();
    this.sub.push(
      this.sincServiceService.addSincService(this.sincService)
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
    this.sincServicesFormGroup = this.formBuilder.group({
      customersProductsId: [this.customersProductsId],
      addressName: [],
      ipaddress: [],
      port: [],
      synchronizerServiceName: [],
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
