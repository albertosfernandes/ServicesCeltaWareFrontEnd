import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { TechService } from '../../tech.service';
import { ModelProduct } from 'src/app/models/model-product';

@Component({
  selector: 'app-form-produto',
  templateUrl: './form-produto.component.html',
  styleUrls: ['./form-produto.component.css']
})
export class FormProdutoComponent implements OnInit {

  productForm: FormGroup;
  product: ModelProduct;

  constructor(private techService: TechService, private formBuilder: FormBuilder) { }


  // addProduct(_product: ModelProduct) {
  //   this.techService.addProduct(_product)
  //   .subscribe(data => {
  //   },
  //   error => {
  //     alert('error ');
  //   });
  // }

  onSubmitProduct() {
    this.product = this.productForm.getRawValue();
    // const settingData = new FormData();
    // settingData.append('enterprise', values.EnterpriseId);
    // settingData.append('pdv', values.PdvId);
    // settingData.append('serialPos', values.PosSerial);
    console.log('chamando o service addProduto com valor: ' + this.product);
     this.techService.addProduct(this.product)
    .subscribe(
      () => console.log('sucess...'),
      err => console.log('error: ' + err)
    );
  }

  loadForm() {
    // this.NewsfeedForm = this._formBuilder.group({
    //   NewsfeedID: [0,null],
    //   StatusID: ['', Validators.required],
    //   publishdate: ['', Validators.required]
    //   })
    this.productForm = this.formBuilder.group({
      productId: [0] ,
      name: []
    });
  }

  ngOnInit() {
    this.loadForm();
  }

}
