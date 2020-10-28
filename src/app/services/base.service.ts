import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API = 'http://localhost:10965';

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
