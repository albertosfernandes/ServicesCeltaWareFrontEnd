import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API = 'http://update.celtaware.com.br:9994';
// const API = 'http://localhost:9992';
// const API = 'http://localhost:20854';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private http: HttpClient) {
    this.httpBase = this.http;
    this.urlapi = API;
  }

  public urlapi: string;
  public httpBase: HttpClient;
}
