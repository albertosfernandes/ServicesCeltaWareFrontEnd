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

  constructor(private formBuilder: FormBuilder, private sincWebService: ServiceSincwebService) { }

  onSubmitFormSincWeb() {
    this.sincWeb = this.sincWebFormGroup.getRawValue();
    this.sub.push(
      this.sincWebService.addSincWeb(this.sincWeb)
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
    this.sincWebFormGroup = this.formBuilder.group({
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
