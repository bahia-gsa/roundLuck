import { Component } from '@angular/core';
import {QuarkusService} from "../../services/quarkus.service";
import {CookieService} from "ngx-cookie-service";



@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {

  token!: string;

  constructor(private quarkusService: QuarkusService,
              private cookieService: CookieService) {
    const encodedCookieValue = this.cookieService.get('login');
    if (encodedCookieValue) {
      const jsonObject = JSON.parse(decodeURIComponent(encodedCookieValue));
      this.token = jsonObject.token;
    }
  }

  teste() {
    this.quarkusService.authenticate(this.token).subscribe({
      next: data => {
        console.log(data);
      },
      error: error => {
        console.log(error);
      }
    });
  }

}
