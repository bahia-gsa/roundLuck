import {Component, OnInit} from '@angular/core';
import {User} from "../../model/User";
import {AuthService} from "../../services/auth.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user?: User;
  editingName: boolean = false;
  editingEmail: boolean = false;
  editingUser: { name: string; email: string } = {name: '', email: ''};

  constructor(private auth: AuthService,
              private cookieService: CookieService) { }

  ngOnInit(): void {
    if (this.cookieService.check('login')) {
      const userObject = JSON.parse(decodeURIComponent(this.cookieService.get('login')));
      this.user = {
        id: userObject.id,
        name: userObject.name,
        email: userObject.email
      }
    }
  }

   editName() {
    this.editingName = true;

   }

   saveName() {
    console.log(this.editingUser.name);
    this.editingName = false;
   }

   editEmail() {
    this.editingEmail = true;
   }

   saveEmail() {
    console.log(this.editingUser.email);
    this.editingEmail = false;
   }

    deleteProfile() {
      console.log('Delete profile');
    }







}
