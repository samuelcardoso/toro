import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from "../../models/user.model";
import {Observable} from "rxjs";

@Injectable()
export class UserApiService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8082/users/';

  getUsers() : Observable<any> {
    return this.http.get<any>(`${this.baseUrl}all`);
  }

  createUser(user: User): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, user);
  }

  // not used for this implementation
  /*
  getUserById(id: String): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${id}`);
  }

  updateUser(user: User): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}${user.id}`, user);
  }

  deleteUser(id: String): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}${id}`);
  }
  */
}
