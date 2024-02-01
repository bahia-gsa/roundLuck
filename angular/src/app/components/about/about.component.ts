import { Component } from '@angular/core';
import {ContactComponent} from "../contact/contact.component";
import {MatDialog} from "@angular/material/dialog";
import {AndroidAppComponent} from "../android-app/android-app.component";

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

  openPopup(){
    this.dialog.open(AndroidAppComponent, {
      width: '100%',
      height: '60%',
    });
  }

}
