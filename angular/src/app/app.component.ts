import {Component} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {CookieService} from "ngx-cookie-service";
import {gsap} from "gsap";


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

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.animateTitle();
    });
  }

  animateTitle(): void {
    const tl = gsap.timeline({ repeat: -1 });
    const animationSettings = {
      duration: 30,
      backgroundPosition: "-960px 0",
    };
    tl.to(".letter", animationSettings);
  }

}


