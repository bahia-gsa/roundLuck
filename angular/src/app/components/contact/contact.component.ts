import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {QuarkusService} from "../../services/quarkus.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private quarkusService: QuarkusService,
              public dialog: MatDialog) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      from: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50)]],
      message: ['', [Validators.required,
        Validators.minLength(5),
        Validators.maxLength(500)]]
    });
  }

  sendEmail() {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
      this.quarkusService.mail(this.contactForm.value).subscribe({
        next: data => {
          this.dialog.closeAll()
        },
        error: error => {
          console.error('There was an error!', error);
        }
      });
    }

  }


}
