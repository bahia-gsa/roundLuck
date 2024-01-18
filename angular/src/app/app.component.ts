import {Component, HostListener} from '@angular/core';
import {QuarkusService} from "./services/quarkus.service";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {CookieService} from "ngx-cookie-service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Draw your luck';

  isMobile: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver,
              private cookieService: CookieService) {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isMobile = result.matches;
    });
  }

 /* @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: any) {
    this.clearSessionStorage();
    this.removeCookie('qAuth');
    this.removeCookie('login');
  }

  private clearSessionStorage() {
    if (window.location.origin === 'https://www.draw.schaedler-almeida.space') {
      sessionStorage.clear();
    }
  }
  private removeCookie(cookieName: string) {
    this.cookieService.delete(cookieName);
  }*/

}


