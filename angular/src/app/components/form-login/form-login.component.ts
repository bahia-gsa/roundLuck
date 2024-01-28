import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../services/auth.service";
import {CookieService} from "ngx-cookie-service";
import {QuarkusService} from "../../services/quarkus.service";
import {UserLogged} from "../../model/UserLogged";
import {DataService} from "../../services/data.service";
import {FormRegisterComponent} from "../form-register/form-register.component";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit {

  logForm: FormGroup;
  hide = true;
  error_401 = false;
  userLogged!: UserLogged;


  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private dialog: MatDialog,
    private dataService: DataService,
    private quarkusService: QuarkusService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document

  ) {
    this.logForm = this.formBuilder.group({
      email: this.data?.email ?? '',
      password: '',
    });
  }

  ngOnInit(): void {
    this.logForm = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(6),
        Validators.maxLength(50),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).*$/),
        Validators.minLength(8),
        Validators.maxLength(50),
      ]),
    });
      const script = this.renderer.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;

      this.renderer.appendChild(this.document.body, script);

      script.onload = () => {
      };

  }


  loginRequest() {
    if (this.logForm.valid) {
      const formData = this.logForm.value;
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
          this.dialog.closeAll();
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

  openPwdForgot() {
    alert('Sorry, not implemented yet');
  }

}
