import { Component } from '@angular/core';
import {ContactComponent} from "../contact/contact.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  constructor(private dialog: MatDialog){  }

  openContactForm(){
    this.dialog.open(ContactComponent, {
      width: '100%',
      height: '80%',
    });
  }

}
