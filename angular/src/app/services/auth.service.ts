import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public registerUser(newUser: { name: string, password: string, email: string }): Observable<any>   {
    return this.http.post(environment.baseUrlAuth + '/profile/register', newUser);
  }

  public loginUser(credentials: { email: string, password: string }): Observable<any>   {
    const basicAuthEncoded = 'Basic ' + btoa(credentials.email + ':' + credentials.password);
    const headerOption = { headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': basicAuthEncoded
      }),
    };
    return this.http.post(environment.baseUrlAuth + '/profile/login', {}, headerOption);
  }

}
