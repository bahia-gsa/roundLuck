import {Component, OnInit} from '@angular/core';
import {ContactComponent} from "../contact/contact.component";
import {MatDialog} from "@angular/material/dialog";
import {AboutComponent} from "../about/about.component";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  currentYear?: string;

  constructor(private dialog: MatDialog){  }

  ngOnInit(): void {
    this.currentYear = this.getCurrentYear();
  }

  getCurrentYear(): string {
    return new Date().getFullYear().toString();
  }

  openContact(){
    this.dialog.open(ContactComponent, {
      width: '100%',
      height: '80%',
    });
  }

  openAbout(){
    this.dialog.open(AboutComponent, {
      width: '100%',
      height: '80%',
    });
  }

  openLinkedInProfile(){
    window.open('https://www.linkedin.com/in/schaedler-almeida', '_blank');
  }

}
