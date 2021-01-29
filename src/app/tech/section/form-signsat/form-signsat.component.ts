import { error } from 'protractor';
import { ServiceSigSatService } from './../../../services/service-sig-sat.service';
import { Component, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-signsat',
  templateUrl: './form-signsat.component.html',
  styleUrls: ['./form-signsat.component.css']
})
export class FormSignsatComponent implements OnInit, OnChanges, OnDestroy {

  key = ' ';
  signSatForm: FormGroup;
  signValue;
  sub: Subscription[] = [];


  constructor(private formBuilder: FormBuilder, private signsatService: ServiceSigSatService) { }

  onsubmitSignSat() {
    this.signValue = this.signSatForm.getRawValue();
    this.sub.push(
      this.signsatService.generateKey(this.signValue.cnpjCustomer)
      .subscribe(keyValue => {
        this.key = keyValue;
      },
      err => {
        alert(err);
      },
      () => {
        // finish
      }
      )
    );
  }

  initForm() {
    this.signSatForm = this.formBuilder.group({
      signSatId: [0],
      cnpjCustomer: []
    });
  }

  ngOnDestroy() {
    this.sub.forEach(s => s.unsubscribe);
  }

  ngOnChanges() {
  }

  generate() {
    alert('gerando chave');
  }

  ngOnInit() {
    this.initForm();
  }

}
