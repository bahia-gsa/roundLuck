import {Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import {QuarkusService} from "../services/quarkus.service";
import {Game} from "../model/Game";
import {User} from "../model/User";
import {DataService} from "../services/data.service";
import {Router} from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from "../services/auth.service";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {FormLoginComponent} from "../components/form-login/form-login.component";
import {CookieService} from "ngx-cookie-service";




@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isConnected: boolean = false;
  games: Game[]= [];
  user!: User;
  newGameName!: string;
  errorMessage: string = '';
  form: FormGroup;

  constructor(private breakpointObserver: BreakpointObserver,
              private quarkus: QuarkusService,
              private cookieService: CookieService,
              private router: Router,
              private dialog: MatDialog,
              private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      newGameName: [
        this.newGameName,
        [Validators.required, Validators.minLength(3), Validators.maxLength(20)]
      ]
    });
  }

  ngOnInit(): void {
    const encodedCookieValue = this.cookieService.get('login');
    if (encodedCookieValue) {
      const jsonObject = JSON.parse(decodeURIComponent(encodedCookieValue));
      this.user = {
        id: Number(jsonObject.userId),
        name: jsonObject.name,
        email: jsonObject.email
      };
      this.isConnected = true;
      this.getGamesByUser();
      }
    console.log(this.user);
  }

  isSmallScreen$ = this.breakpointObserver.observe([Breakpoints.Handset])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  openFormLogin() {
    this.dialog.open(FormLoginComponent)
  }

  logout() {
  }

  private getGamesByUser(){
    this.quarkus.getGamesByUser(this.user.id)
      .subscribe({
        next: data => {
          this.games = data;
        },
        error: error => {
        }
      });
  }

  openGame(gameId: number) {
    const userId = this.user.id;
    this.router.navigate(['/game'], { queryParams: { gameId, userId } });
  }

  submitInput() {
    if (this.form.valid) {
      if (this.isNewGameAvailable()) {
        this.quarkus.saveNewGame({gameName: this.form.get('newGameName')?.value, user: {id: this.user.id}})
          .subscribe({
            next: data => {
              this.errorMessage = '';
              this.games.push(data);
            },
            error: error => {
              this.errorMessage = error.error.parameterViolations[0].message;
            }
          })
      } else {
        alert("You can't have more than 7 games");
      }
    }
  }

  deleteGame(id: number) {
    let confirm = window.confirm("Are you sure you want to delete this game?");
    if (confirm){
      this.quarkus.deleteGame(id).subscribe({
        next: data => {
          this.games = this.games.filter(game => game.id !== id);
        }
      })
    }
  }

  isNewGameAvailable() {
    return this.games.length < 7;
  }

  get newGameNameControl() {
    return this.form.get('newGameName');
  }
}
