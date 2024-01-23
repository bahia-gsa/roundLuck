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

  public deleteUser(userId: number): Observable<any>   {
    return this.http.delete(environment.baseUrlAuth + '/profile/' + userId);
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

  public loginWithGoogle(token: string): Observable<any>   {
    const headerOptions = { headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })};
    return this.http.post(environment.baseUrlAuth + '/profile/loginGoogle', token, headerOptions);
  }

  public changeName(userId: number, name: string): Observable<any>   {
    return this.http.post(environment.baseUrlAuth + '/profile/changeName/' + userId, {name});
  }
  public changeEmail(userId: number, email: string): Observable<any>   {
    return this.http.post(environment.baseUrlAuth + '/profile/changeEmail/' + userId, {email});
  }



}
