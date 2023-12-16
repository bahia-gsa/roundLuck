import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../services/auth.service";
import {CookieService} from "ngx-cookie-service";
import {QuarkusService} from "../../services/quarkus.service";
import {UserLogged} from "../../model/UserLogged";

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
    private router: Router,
    private dialog: MatDialog,
    private quarckus: QuarkusService
  ) {
    this.logForm = this.formBuilder.group({
      email: '',
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
          window.location.reload();
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

  closeFormLogin() {
    this.dialog.closeAll();
  }


}
