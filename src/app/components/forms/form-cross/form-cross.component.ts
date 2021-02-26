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

  constructor(private formBuilder: FormBuilder, private crossService: ServiceCrossService) { }

  onSubmitFormCross() {
    this.cross = this.appCrossFormGroup.getRawValue();
    this.sub.push(
      this.crossService.addCross(this.cross)
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
    this.appCrossFormGroup = this.formBuilder.group({
      customersProductsId: [this.customersProductsId],
      addressName: [],
      ipAddress: [],
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
