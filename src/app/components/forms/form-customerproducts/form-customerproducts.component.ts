import { CloudService } from 'src/app/cloud/cloud.service';
import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { ModelCustomersProducts } from 'src/app/models/model-customersproducts';
import { TechService } from 'src/app/tech/tech.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModelServer } from 'src/app/models/model-server';
import { ModelProduct } from 'src/app/models/model-product';
import { ServersService } from 'src/app/tech/section/servers/servers.service';

@Component({
  selector: 'app-form-customerproducts',
  templateUrl: './form-customerproducts.component.html',
  styleUrls: ['./form-customerproducts.component.css']
})
export class FormCustomerproductsComponent implements OnInit, OnChanges {

  @Input() customerId = 0;
  @Output() isCancel = new EventEmitter();
  customersProducts: ModelCustomersProducts;
  customersProductsForCloud: ModelCustomersProducts;
  customerProductFormGroup: FormGroup;
  products: ModelProduct[];
  servers: ModelServer[] = [];
  productId = 0;
  isCreated = false;
  isCheckCreateCloud = false;
  customersProductId;
  msgCreateCustomerProduct: any;
  isExecutingScript = false;
  serversId: any;

  constructor(private cloudService: CloudService, private techService: TechService,
              private formBuilder: FormBuilder,
              private serverService: ServersService) { }

              onSubmitCustomerProduct() {
                this.isExecutingScript = true;
                this.customersProducts = this.customerProductFormGroup.getRawValue();
                this.customersProducts.customerId = this.customerId;
                this.customersProducts.productId = this.productId;
                this.customersProducts.serversId = this.serversId;
                 this.techService.addCustomerProduct(this.customersProducts)
                .subscribe(data => {
                  this.customersProductId = data;
                  },
                  err => {
                    alert('error: ' + err);
                },
                () => {
                  this.loadCreateCustomersProducts(this.customersProductId);
                  this.isExecutingScript = false;
                }
                );
              }

              btnCancel() {
                this.isExecutingScript = false;
                this.isCancel.emit(false);
              }

              initForm() {
                this.customerProductFormGroup = this.formBuilder.group({
                  customerId: [this.customerId],
                  productId: [this.productId],
                  addressName: [],
                  ipAddress: [],
                  port: [],
                  loginUser: [],
                  loginPassword: [],
                  installDirectory: [],
                  synchronizerServiceName: []
                });
              }

              onChangeSelect(productIdValue) {
                this.productId = productIdValue;
              }

              clicado(value) {
                this.isCheckCreateCloud = !this.isCheckCreateCloud;
                alert(value);
              }

              onChangeSelectServer(serverId) {
                this.serversId = serverId;
              }

              loadCreateCustomersProducts(customerProductId) {
                this.cloudService.getCustomerProduct(customerProductId)
                .subscribe(customerProductdata => {
                  this.customersProductsForCloud = customerProductdata;
                },
                err => {
                  alert('erro: ' + err);
                },
                () => {
                  if (this.isCheckCreateCloud) {
                      this.createCustomersProducts(this.customersProductsForCloud);
                  }
                });
              }

              createCustomersProducts(customerProduct) {
                this.techService.createCustomerProduct(this.customersProductsForCloud)
                .subscribe(responseData => {
                  this.msgCreateCustomerProduct = responseData;
                },
                err => {
                  alert('Erro na criação do Produto: ' + err.error);
                },
                () => {
                  if (this.customersProductsForCloud.productId === 6) {
                    this.createCustomersProductsDatabase(this.customersProductsForCloud);
                  } else {
                    alert('Adicionado com sucesso: ');
                    this.isExecutingScript = false;
                  }
                });
              }

              createCustomersProductsDatabase(customerProduct) {
                this.techService.createCustomerProductDatabase(this.customersProductsForCloud)
                .subscribe(responseData => {
                  this.msgCreateCustomerProduct = responseData;
                },
                err => {
                  alert('Erro Alerto na criação do Banco: ' + err);
                },
                () => {
                  alert('Criado com sucesso.');
                  this.isExecutingScript = false;
                });
              }

              btnAddCustomerProduct() {
                this.customersProducts = this.customerProductFormGroup.getRawValue();
                this.customersProducts.customerId = this.customerId;
                this.customersProducts.productId = this.productId;
                 this.techService.addCustomerProduct(this.customersProducts)
                .subscribe(data => {
                  this.customersProductId = data;
                  },
                  err => {
                    alert('error: ' + err);
                },
                () => {
                  this.customersProducts.customersProductsId = this.customersProductId;
                  this.techService.createCustomerProduct(this.customersProducts)
                  .subscribe(data => {

                  },
                  erro => {
                    console.log('erro ao criar em nuvem');
                  },
                  () => {
                    alert('Criado com sucesso');
                  });
                }
                );
              }


              getAllservers() {
                this.serverService.getServersAll()
                .subscribe(serversValue => {
                  this.servers = serversValue;
                },
                erro => {
                  alert('Erro ao carregar servidores');
                },
                () => {
                });
              }

  ngOnInit() {
    this.initForm();
    this.cloudService.getProductsAll()
    .subscribe(productsdata => {
      this.products = productsdata;
    });
    this.getAllservers();
  }

  ngOnChanges() {
    this.initForm();
    this.cloudService.getProductsAll()
    .subscribe(productsdata => {
      this.products = productsdata;
    });
    this.getAllservers();
  }

}
