import { Component } from '@angular/core';
import {QuarkusService} from "./services/quarkus.service";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Draw your luck';

  isMobile: boolean = false;

  constructor(private quarkus: QuarkusService,
              private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isMobile = result.matches;
    });
  }

}


