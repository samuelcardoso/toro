import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable()
export class AccountApiService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8082/accounts/';

  getAccountById(id: String): Observable<any> {
    return this.http.get<any>(this.baseUrl + id);
  }

  updateBalance(account: Account, amount: String): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}${account.id}`, {
      amount: amount
    });
  }

  buyStock(account: Account, amount: String): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}${account.id}/buystock`, {
      amount: amount
    });
  }

  sellStock(account: Account, amount: String): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}${account.id}/sellstock`, {
      amount: amount
    });
  }
}
