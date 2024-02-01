import {Component, OnInit} from '@angular/core';
import {QuarkusService} from "../../services/quarkus.service";
import {CookieService} from "ngx-cookie-service";
import {UserLogged} from "../../model/UserLogged";
import { gsap } from 'gsap';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  userLogged!: UserLogged;
  phrases: string[] = [
    "create a game",
    "easily add, remove, and edit players",
    "randomly select a player",
    "keep track of who's turn it is"
  ];
  currentPhraseIndex: number = 0;
  currentLetterIndex: number = 0;
  currentPhrase: string = '';


  constructor(private quarkusService: QuarkusService,
              private cookieService: CookieService) {
    const encodedCookieValue = this.cookieService.get('login');
    if (encodedCookieValue) {
      const jsonObject = JSON.parse(decodeURIComponent(encodedCookieValue));
      this.userLogged = {token: jsonObject.token, email: jsonObject.email};
      this.getQuarkusAuthenticationToken(this.userLogged)
    }
  }

  ngOnInit(): void {
    this.animateTitle();
    this.displayNextPhrase();

  }

  animateTitle(): void {
    const tl = gsap.timeline({ repeat: -1 });
    const animationSettings = {
      duration: 30,
      backgroundPosition: "-960px 0",
    };
    tl.to(".letter", animationSettings);
  }

  displayNextPhrase() {
    if (this.currentPhraseIndex < this.phrases.length) {
      this.currentPhrase = this.phrases[this.currentPhraseIndex];
      this.currentLetterIndex = 0;
      this.typeNextLetter();
    }
  }

  typeNextLetter() {
    if (this.currentLetterIndex < this.currentPhrase.length) {
      setTimeout(() => {
        this.currentLetterIndex++;
        this.typeNextLetter();
      }, 100);
    } else {
      if (this.currentPhraseIndex < this.phrases.length - 1) {
        this.currentPhraseIndex++;
      } else {
        this.currentPhraseIndex = 0;
      }
      setTimeout(() => {
        this.displayNextPhrase();
      }, 1000);
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
