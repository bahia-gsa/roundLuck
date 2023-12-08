import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
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

  public loginUser(user: { name: string, password: string }): Observable<any>   {
    return this.http.post(environment.baseUrlAuth + '/profile/login', user);
  }

}
