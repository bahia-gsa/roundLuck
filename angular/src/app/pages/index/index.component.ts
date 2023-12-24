import { Component } from '@angular/core';
import {QuarkusService} from "../../services/quarkus.service";
import {CookieService} from "ngx-cookie-service";
import {UserLogged} from "../../model/UserLogged";



@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {

  userLogged!: UserLogged;

  constructor(private quarkusService: QuarkusService,
              private cookieService: CookieService) {
    const encodedCookieValue = this.cookieService.get('login');
    if (encodedCookieValue) {
      const jsonObject = JSON.parse(decodeURIComponent(encodedCookieValue));
      this.userLogged = {token: jsonObject.token, email: jsonObject.email};
      this.getQuarkusAuthenticationToken(this.userLogged)
    }
  }

  getQuarkusAuthenticationToken(userLogged: UserLogged) {
    this.quarkusService.authenticate(userLogged).subscribe({
      next: data => {
        this.cookieService.set('qAuth', JSON.stringify(data));
      },
      error: error => {
        console.log(error);
      }
    })
  }
}
