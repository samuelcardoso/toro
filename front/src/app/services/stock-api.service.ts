import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from "../models/user.model";
import {Observable} from "rxjs";

@Injectable()
export class StockApiService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8082/stocks/';

  all() : Observable<any> {
    return this.http.get<any>(`${this.baseUrl}all`);
  }
}
