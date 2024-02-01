import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserLogged} from "../../model/UserLogged";
import {AuthService} from "../../services/auth.service";
import {CookieService} from "ngx-cookie-service";
import {MatDialog} from "@angular/material/dialog";
import {DataService} from "../../services/data.service";
import {QuarkusService} from "../../services/quarkus.service";
import {gsap} from "gsap";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  form: FormGroup;
  userLogged!: UserLogged;
  error_401 = false;

  constructor(private renderer: Renderer2,
              private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private cookieService: CookieService,
              private dataService: DataService,
              private quarkusService: QuarkusService,
              @Inject(DOCUMENT) private document: Document)
  {
    this.form = this.formBuilder.group({
      email: new FormControl(router.getCurrentNavigation()?.extras.state?.['email'] || '', [
        Validators.required,
        Validators.email,
        Validators.minLength(6),
        Validators.maxLength(50),
      ]),
      password: new FormControl('', [
        Validators.required,
      ]),
     }
    );
  }


  ngOnInit(): void {
    this.animateTitle();
    const script = this.renderer.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;

    this.renderer.appendChild(this.document.body, script);

    script.onload = () => {
    };
  }

  animateTitle(): void {
    const tl = gsap.timeline({ repeat: -1 });
    const animationSettings = {
      duration: 30,
      backgroundPosition: "-960px 0",
    };
    tl.to(".title", animationSettings);
  }

  submitForm(): void {
    if (this.form.valid) {
      const formData = this.form.value;
      const credentials = {email: formData.email, password: formData.password };
      this.authService.loginUser(credentials).subscribe({
        next: (data) => {
          const expirationDate  = new Date();
          expirationDate .setHours(expirationDate.getHours() + 1);
          this.cookieService.set('login', JSON.stringify(data), expirationDate);
          this.userLogged = {token: data.token, email: data.email};
          this.getQuarkusAuthenticationToken(this.userLogged)
          this.dataService.setUser({
            id: Number(data.userId),
            name: data.name,
            email: data.email,
          });
          this.router.navigate(['']);
        },
        error: ( HttpErrorResponse ) => {
          console.log("Error API back: <-------", HttpErrorResponse);
          if ( HttpErrorResponse.status == 401 ) {
            this.error_401 = true;
          }
        },
      });
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
