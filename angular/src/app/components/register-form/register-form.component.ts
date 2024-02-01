import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {gsap} from "gsap";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router)
  {
    this.form = this.formBuilder.group({
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]),
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
      }
    );
  }

  ngOnInit(): void {
    this.animateTitle();
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
    this.authService.registerUser(this.form.value).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/login'], { state: { email: response.email } });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
