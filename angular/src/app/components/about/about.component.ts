import {Component, OnInit} from '@angular/core';
import {ContactComponent} from "../contact/contact.component";
import {MatDialog} from "@angular/material/dialog";
import {AndroidAppComponent} from "../android-app/android-app.component";
import {gsap} from "gsap";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private dialog: MatDialog){  }

  ngOnInit(): void {
    this.animateTitle();
  }

  animateTitle(): void {
    const tl = gsap.timeline({ repeat: -1 });
    const animationSettings = {
      duration: 30,
      backgroundPosition: "-960px 0",
    };
    tl.to("h1", animationSettings);
  }

  openPopup(){
    this.dialog.open(AndroidAppComponent, {
      width: '100%',
      height: '60%',
    });
  }

  navigateToGitHub() {
    window.open('https://github.com/bahia-gsa/roundLuck', '_blank');
  }

  navigateToLinkedIn() {
    window.open('https://www.linkedin.com/in/schaedler-almeida/', '_blank');
  }

}
