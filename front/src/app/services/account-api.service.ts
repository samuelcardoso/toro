import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import { Account } from '../models/account.type';

@Injectable()
export class AccountApiService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8082/accounts/';

  getById(id: String): Observable<any> {
    return this.http.get<any>(this.baseUrl + id);
  }

  updateBalance(account: Account, amount: String): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}${account.id}`, {
      amount: amount
    });
  }

  buyStock(account: Account, stockName: String): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}${account.id}/buystock`, {
      stock: stockName
    });
  }

  sellStock(account: Account, stockName: String): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}${account.id}/sellstock`, {
      stock: stockName
    });
  }
}
