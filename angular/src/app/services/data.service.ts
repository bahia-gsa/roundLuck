import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {User} from "../model/User";

@Injectable({
  providedIn: 'root'
})
export class DataService {


  private userSubject = new Subject<User>;
  User$ = this.userSubject.asObservable();

  setUser(User: User): void {
    this.userSubject.next(User);
  }



}
