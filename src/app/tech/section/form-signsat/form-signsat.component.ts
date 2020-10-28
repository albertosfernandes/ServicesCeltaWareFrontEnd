import { Component, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-signsat',
  templateUrl: './form-signsat.component.html',
  styleUrls: ['./form-signsat.component.css']
})
export class FormSignsatComponent implements OnInit, OnChanges, OnDestroy {

  key: string;
  signSatForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  onsubmitSignSat() {

  }

  initForm() {
    this.signSatForm = this.formBuilder.group({
      signSatId: [0],
      cnpjCustomer: []
    });
  }

  ngOnDestroy() {

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
