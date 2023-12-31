import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../services/auth.service";
import {FormLoginComponent} from "../form-login/form-login.component";

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.scss']
})
export class FormRegisterComponent implements OnInit {

  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private dialog: MatDialog) { }

  matchValues( matchTo: string ): (AbstractControl:any) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      const parentControls = control.parent?.controls as { [key: string]: AbstractControl<any> };
      return !!control.parent && !!control.parent.value && control.value === parentControls[matchTo].value ? null : { isMatching: false };
    };
  }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [
        Validators.required,
        Validators.email,
        this.matchValues('email')]],
      password: ['',[
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).*$/)
      ]],
      confirmPassword: ['', [
        Validators.required,
        this.matchValues('password')]],
    });
  }

  register() {
    this.authService.registerUser(this.registrationForm.value).subscribe({
      next: (response) => {
        console.log(response);
        this.dialog.closeAll();
        this.dialog.open(FormLoginComponent, {
          width: '100%',
          height: '35%',
          data: {email: this.registrationForm.get('email')?.value}
        })
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
