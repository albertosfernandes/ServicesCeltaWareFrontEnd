import { ModelCustomersProducts } from 'src/app/models/model-customersproducts';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { ModelProduct } from '../models/model-product';
import { ModelCustomer } from '../models/model-customer';
import { Observable, empty } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { error } from 'util';
import { ModelCertificate } from '../models/model-certificate';

const API = 'http://update.celtaware.com.br:9994';
// const API = 'http://localhost:20854';
// const API = 'http://localhost:9991';

@Injectable({
  providedIn: 'root'
})

export class CloudService {

  constructor(private http: HttpClient) { }

  getProductsAll() {
    return this.http
    .get<ModelProduct[]>(API + '/api/product/getall');
  }
  getCustomersAll() {
    return this.http
    .get<ModelCustomer[]>(API + '/api/customer/getall');
  }

  getCustomersProductsAllDatabases(serverId) {
    return this.http
    .get<ModelCustomersProducts[]>(API + '/api/CustomersProducts/GetAllDatabases?serverId= ' + serverId);
  }

  getCustomersProducts(id) {
    return this.http
    .get<ModelCustomersProducts[]>(API + '/api/CustomersProducts/getall?id=' + id);
  }

  getCustomerProduct(id) {
    return this.http
    .get<ModelCustomersProducts>(API + '/api/CustomersProducts/get?id=' + id);
  }

  getDateTimeDeploy(id, productid) {
    return this.http
    .get(API + '/api/SystemUpdate/GetDateTimeFileDeploy?customersettingsId=' + id + '&productId=' + productid);
  }

  getVersionFile(id) {
    return this.http
    .get(API + '/api/SystemUpdate/GetVersionFile?customersettingsId=' + id);
  }

  getLastExecution(id) {
    return this.http
    .get(API + '/api/SystemUpdate/GetLastExecution?customersettingsId=' + id);
  }

  getStatusService(_serviceName) {
    return this.http
    .get(API + '/api/SystemUpdate/StatusService?servicename=' + _serviceName, { responseType: 'text' });
  }

  getStartStopService(isStart, _serviceName) {
    return this.http
    .get(API + '/api/SystemUpdate/StarStopService?isStart=' + isStart + '&servicename=' + _serviceName);
  }

  getDownloadDeploy(id, productid) {
    return this.http
    .get(API + '/api/SystemUpdate/DownloadDeploy?id=' + id + '&productId=' + productid);
  }

  getUpdateSystem(customerProduct: ModelCustomersProducts) {
    console.log('Chamando Post atualizar ' + customerProduct.product.name);
    return this.http
    .post(API + '/api/SystemUpdate/UpdateCeltaBS',  customerProduct);
  }

  testeBody(value) {
    return this.http
    .get(API + '/api/DatabaseUpdate/TesteDatabase?n=' + value, {responseType: 'text'})
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
    return this.http
      .get(API + '/api/DatabaseUpdate/RepairDatabase?customerSettingsid=' + _customerProductId, { responseType: 'text' } )
      .pipe(
        tap(
          // data => console.log(data),
          // error => console.log(error)
                  )
      );
  }

  getCreateDatabase(_customerProductId, _element) {
    return this.http
      // tslint:disable-next-line: max-line-length
      .get(API + '/api/DatabaseUpdate/CreateDatabase?customerSettingsid=' + _customerProductId + '&element=' + _element, { responseType: 'text' } )
      .pipe(
        tap(
          // data => console.log(data),
          // error => console.log(error)
        )
      );
  }

  getKeyFile(_customerProductId) {
    return this.http
    .get(API + '/api/databaseupdate/getkeys?customerSettingsid=' + _customerProductId, {responseType: 'blob'});
  }

  updateConnectionString(_customerProductId, celtabsuserPassword) {
    return this.http
    .get(API + '/api/DatabaseCreate/UpdateConnectionString?id=' + _customerProductId + '&celtaBSUserPassword=' + celtabsuserPassword);
  }

  addCertificate(certificate: ModelCertificate) {
    return this.http
    .post(API + '/api/certificate/add', certificate);
  }

  teste(valueTeste, filecert: File) {
    const formDataTste = new FormData();
    formDataTste.append('valueTeste', 'primeiro teste');
    formDataTste.append('valueTeste', filecert, filecert.name);
    console.log('enviando via post o forData ' + formDataTste);
    const request = new HttpRequest('POST', API + '/api/certificate/teste', formDataTste);

    return this.http.request(request)
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

   const request = new HttpRequest('POST', API + '/api/certificate/upload', formData);
   console.log(formData);
   return this.http.request(request)
   .pipe(
     tap(
       data => console.log(data),
       // tslint:disable-next-line: no-shadowed-variable
       error => console.log(error)
     )
   );
  }

  getCertificate(_certificateId) {
    return this.http
    .get<ModelCertificate>(API + '/api/certificate/Get?id=' + _certificateId);
  }

  getCertificates(_customerId) {
    return this.http
    .get<ModelCertificate[]>(API + '/api/certificate/GetAll?id=' + _customerId);
  }

  installCertificatea1(certificateIdFor: number) {
    return this.http
    .post(API + '/api/certificate/installcertificate', certificateIdFor)
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
    return this.http
    .get(API + '/api/certificate/GetCertificateFile?id=' + certId, {responseType: 'blob'});
  }

  removeCertificate(_certIdForRemove) {
    return this.http
    .get(API + '/api/certificate/Remove?id=' + _certIdForRemove);
  }
}
