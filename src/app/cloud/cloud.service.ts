import { ModelServer } from 'src/app/models/model-server';
import { BaseService } from './../services/base.service';
import { ModelCustomersProducts } from 'src/app/models/model-customersproducts';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { ModelProduct } from '../models/model-product';
import { ModelCustomer } from '../models/model-customer';
import { Observable, empty } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ModelCertificate } from '../models/model-certificate';

@Injectable({
  providedIn: 'root'
})

export class CloudService {

  constructor(private base: BaseService) { }

  getProductsAll() {
    return this.base.httpBase
    .get<ModelProduct[]>(this.base.urlapi + '/api/product/getall');
  }
  getCustomersAll() {
    return this.base.httpBase
    .get<ModelCustomer[]>(this.base.urlapi + '/api/customer/getall');
  }

  getCustomersProductsAllDatabases(serverId) {
    return this.base.httpBase
    .get<ModelCustomersProducts[]>(this.base.urlapi + '/api/CustomersProducts/GetAllDatabases?serverId= ' + serverId);
  }

  getCustomersProducts(id) {
    return this.base.httpBase
    .get<ModelCustomersProducts[]>(this.base.urlapi + '/api/CustomersProducts/getall?id=' + id);
  }

  getCustomerProduct(id) {
    return this.base.httpBase
    .get<ModelCustomersProducts>(this.base.urlapi + '/api/CustomersProducts/get?id=' + id)
    .pipe(
      tap(
        data => console.warn(data),
        err => console.log(err.error)
      )
    );
  }

  getDateTimeDeploy(server: ModelServer, id, productid) {
    return this.base.httpBase
    .get( 'http://' + server.hostname + ':' + server.port
      + '/api/SystemUpdate/GetDateTimeFileDeploy?customersettingsId=' + id + '&productId=' + productid);
  }

  getVersionFile(server: ModelServer, id) {
    return this.base.httpBase
    .get('http://' + server.hostname + ':' + server.port
      + '/api/SystemUpdate/GetVersionFile?customersettingsId=' + id);
  }

  getLastExecution(server: ModelServer, id) {
    return this.base.httpBase
    .get('http://' + server.hostname + ':' + server.port
      + '/api/SystemUpdate/GetLastExecution?customersettingsId=' + id);
  }

  getStatusService(_serviceName) {
    return this.base.httpBase
    .get(this.base.urlapi + '/api/SystemUpdate/StatusService?servicename=' + _serviceName, { responseType: 'text' });
  }

  getStartStopService(server: ModelServer, isStart, _serviceName) {
    return this.base.httpBase
    .get('http://' + server.hostname + ':' + server.port
      + '/api/SystemUpdate/StarStopService?isStart=' + isStart + '&servicename=' + _serviceName);
  }

  getDownloadDeploy(server: ModelServer, id, productid) {
    return this.base.httpBase
    .get('http://' + server.hostname + ':' + server.port
      + '/api/SystemUpdate/DownloadDeploy?id=' + id + '&productId=' + productid)
      .pipe(
        tap(
          data => console.warn(data),
          err => console.log(err.error)

        )
      );
  }

  getUpdateSystem(server: ModelServer, customerProduct: ModelCustomersProducts) {
    return this.base.httpBase
    .post('http://' + server.hostname + ':' + server.port
      + '/api/SystemUpdate/UpdateCeltaBS',  customerProduct , {responseType: 'text'})
    .pipe(
      tap(
         data => console.log(data),
         // tslint:disable-next-line: no-shadowed-variable
         error => console.log(error)
      )
    );
  }

  testeBody(value) {
    return this.base.httpBase
    .get(this.base.urlapi + '/api/DatabaseUpdate/TesteDatabase?n=' + value, {responseType: 'text'})
    .pipe(
      tap( // Log the result or error
         // data => console.log(data),
      )
      // ,
      // // tslint:disable-next-line: no-shadowed-variable
      // catchError(error => {
      //   console.error(error.error);
      //   // tslint:disable-next-line: deprecation
      //   return error;
      // })
    );
  }

  getRepairDatabase(_customerProductId) {
    return this.base.httpBase
      .get(this.base.urlapi +
        '/api/DatabaseUpdate/RepairDatabase?customerSettingsid=' + _customerProductId, { responseType: 'text' } )
      .pipe(
        tap(
          // data => console.log(data),
          // error => console.log(error)
                  )
      );
  }

  getCreateDatabase(_customerProductId, _element) {
    return this.base.httpBase
      // tslint:disable-next-line: max-line-length
      .get(this.base.urlapi + '/api/DatabaseUpdate/CreateDatabase?customerSettingsid=' + _customerProductId + '&element=' + _element, { responseType: 'text' } )
      .pipe(
        tap(
          // data => console.log(data),
          // error => console.log(error)
        )
      );
  }

  getKeyFile(_customerProductId) {
    return this.base.httpBase
    .get(this.base.urlapi + '/api/databaseupdate/getkeys?customerSettingsid=' + _customerProductId, {responseType: 'blob'});
  }

  updateConnectionString(_customerProductId, celtabsuserPassword) {
    return this.base.httpBase
    .get(this.base.urlapi +
      '/api/DatabaseCreate/UpdateConnectionString?id=' + _customerProductId + '&celtaBSUserPassword=' + celtabsuserPassword);
  }

  addCertificate(certificate: ModelCertificate) {
    return this.base.httpBase
    .post(this.base.urlapi + '/api/certificate/add', certificate);
  }

  teste(valueTeste, filecert: File) {
    const formDataTste = new FormData();
    formDataTste.append('valueTeste', 'primeiro teste');
    formDataTste.append('valueTeste', filecert, filecert.name);
    console.log('enviando via post o forData ' + formDataTste);
    const request = new HttpRequest('POST', this.base.urlapi + '/api/certificate/teste', formDataTste);

    return this.base.httpBase.request(request)
     .pipe(
       tap(
          data => console.log(data),
          // tslint:disable-next-line: no-shadowed-variable
          error => console.log(error)
       )
     );
  }

  uploadFileCertificate(certificateID, _file: File) {

    const formData = new FormData();
    formData.append('certificateFile', _file, _file.name);
    formData.append('certificateFile', certificateID);

   const request = new HttpRequest('POST', this.base.urlapi + '/api/certificate/upload', formData);
   console.log(formData);
   return this.base.httpBase.request(request)
   .pipe(
     tap(
       data => console.log(data),
       // tslint:disable-next-line: no-shadowed-variable
       error => console.log(error)
     )
   );
  }

  uploadFileToBSF(customerId, _file: File) {
    const formData = new FormData();
    formData.append('certificateFile', _file, _file.name);
    formData.append('certificateFile', customerId);
    const request = new HttpRequest('POST', this.base.urlapi + '/api/Customer/Upload', formData, {responseType: 'text'});
     console.log(formData);
     return this.base.httpBase.request(request)
    .pipe(
     tap(
       data => console.log(data),
       // tslint:disable-next-line: no-shadowed-variable
       error => console.log(error)
     )
   );
  }

  getCertificate(_certificateId) {
    return this.base.httpBase
    .get<ModelCertificate>(this.base.urlapi + '/api/certificate/Get?id=' + _certificateId);
  }

  getCertificates(_customerId) {
    return this.base.httpBase
    .get<ModelCertificate[]>(this.base.urlapi + '/api/certificate/GetAll?id=' + _customerId);
  }

  installCertificatea1(certificateIdFor: number) {
    return this.base.httpBase
    .post(this.base.urlapi + '/api/certificate/installcertificate', certificateIdFor, {responseType: 'text'})
    .pipe(
      tap(
        data => console.log(data),
        // tslint:disable-next-line: no-shadowed-variable
        error => console.log(error)
      )
    );
    // console.log('post de: ' +  certificateIdFor);
  }

  getCertificateFile(certId) {
    return this.base.httpBase
    .get(this.base.urlapi + '/api/certificate/GetCertificateFile?id=' + certId, {responseType: 'blob'});
  }

  removeCertificate(_certIdForRemove) {
    return this.base.httpBase
    .get(this.base.urlapi + '/api/certificate/Remove?id=' + _certIdForRemove);
  }
}
