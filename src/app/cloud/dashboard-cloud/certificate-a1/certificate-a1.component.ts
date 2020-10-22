import { error } from 'protractor';
import { Component, OnInit, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { ModelCustomersProducts } from 'src/app/models/model-customersproducts';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CloudService } from '../../cloud.service';
import { ModelCertificate } from 'src/app/models/model-certificate';
import { Subscription } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-certificate-a1',
  templateUrl: './certificate-a1.component.html',
  styleUrls: ['./certificate-a1.component.css']
})
export class CertificateA1Component implements OnInit, OnChanges, OnDestroy {

@Input() customerProducts: ModelCustomersProducts = null;
certificate: ModelCertificate;
certificates: ModelCertificate[];
certificateForm: FormGroup;
isNewCertiticate = false;
certificateId: any;
file: File;
sub: Subscription[] = [];

  constructor(private cloudService: CloudService, private formBuilder: FormBuilder) { }

  newCertificate(_customerId) {
    this.isNewCertiticate = true;
  }

  onSubmitCertificate() {
    this.certificate = this.certificateForm.getRawValue();
    this.certificate.customerId = this.customerProducts.customer.customerId;
    this.certificate.dateHourExpiration = '2000-01-01 00:00:00';
    this.certificate.isInstalled = false;
    this.cloudService.addCertificate(this.certificate)
    .subscribe(certIddata => {
      this.certificateId = certIddata;
    },
    err => {
      alert('Erro: ' + err);
  },
  () => {
    // this.loadCertificates(this.customerProducts.customer.customerId);
    // this.loadForm();
    // this.isNewCertiticate = false;
    this.sendUploadFile();
  }
  );
  }

  sendUploadFile() {
    console.log('valor de certificateId: ' + this.certificateId);
    console.log('arquivo: ' + this.file.name + ' ' + this.file.size);
    this.cloudService.uploadFileCertificate(this.certificateId, this.file)
    .subscribe(resp => {
      console.log('upado com sucesso!');
    },
    err => {
      alert('Erro: ' + err);
    },
    () => {
      this.loadForm();
      this.loadCertificates(this.customerProducts.customer.customerId);
      this.isNewCertiticate = false;
    });
  }

  loadForm() {
    this.certificateForm = this.formBuilder.group({
      certificateId: [0] ,
      customerId: [],
      fileRepositorie: [],
      fileName: [],
      friendlyName: [],
      password: [],
      dateHourExpiration: [],
      isInstalled: []
    });
  }

  onUploadFile(_file) {
    const selectedFile = <FileList>_file.srcElement.files;

    document.getElementById('customFileLabel').innerHTML = selectedFile[0].name;
    console.log('arquivo selecionado: ' + selectedFile[0].name + ' ' + selectedFile[0].size);
    this.file = selectedFile[0];
  }

  eraseFile() {
    // this.file = null;
    // document.getElementById('customFileLabel').innerHTML = '';
  }

  btnUploadClick() {
    console.log('click arquivo: ' + this.file.name);
  // this.cloudService.uploadFileCertificateTeste(this.file)
  this.sub.push(this.cloudService.teste('ss', this.file)
    .subscribe(resp => console.log('upado com sucesso!')));
  }

  loadCertificates(_customerId) {
    console.log('carregando certs de:' + _customerId);
    this.sub.push(this.cloudService.getCertificates(_customerId)
    .subscribe(certificateData => {
      this.certificates = certificateData;
    },
      err => {
        alert('Erro ao carregar os certificados.');
      }
    ));
  }

  btnInstall(certificateIdValue) {
   this.sub.push(this.cloudService.installCertificatea1(certificateIdValue)
   .subscribe(resultData => {
    const teste = resultData;
   },
   erro => {
    alert('Erro ao instalar certificado.' + erro.error);
   },
   () => {
    this.loadCertificates(this.customerProducts.customer.customerId);
   }));
  }

  btnDownload(certId) {
    this.sub.push(this.cloudService.getCertificate(certId)
    .subscribe(certData => {
      this.certificate = certData;
      console.log('baixando:' + this.certificate.fileName);
    },
    err => {},
    () => {

      this.cloudService.getCertificateFile(certId)
    .subscribe(responser => {
      console.log(responser);
      const newBlob = new Blob([responser], { type: 'application/octet-stream' });

       // IE doesn't allow using a blob object directly as link href
            // instead it is necessary to use msSaveOrOpenBlob
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
              window.navigator.msSaveOrOpenBlob(newBlob);
              return;
          }

          // For other browsers:
            // Create a link pointing to the ObjectURL containing the blob.
      const data = window.URL.createObjectURL(newBlob);

      const link = document.createElement('a');
      link.href = data;
      link.download = this.certificate.fileName;
      // this is necessary as link.click() does not work on the latest firefox
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
        },
        err => {
          alert('Erro ao baixar arquivo.');
        } );
    }));
  }

  btnRemove(_certIdForRemove) {
    this.cloudService.removeCertificate(_certIdForRemove)
    .subscribe(response => {
      console.log(response);
    },
    err => {
      console.log('erro para remover certificado.');
    },
    () => {
      this.loadCertificates(this.customerProducts.customer.customerId);
    });
  }

  ngOnInit() {
    this.loadForm();
    this.loadCertificates(this.customerProducts.customer.customerId);
  }

  ngOnDestroy(): void {
    // this.eraseFile();
    this.sub.forEach(s => s.unsubscribe);
  }
  ngOnChanges(): void {
    // this.eraseFile();
    // this.loadForm();
    this.loadCertificates(this.customerProducts.customer.customerId);
    // this.sub.forEach(s => s.unsubscribe);
  }

}
