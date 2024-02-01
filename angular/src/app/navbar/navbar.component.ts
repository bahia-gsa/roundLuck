import {Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import {QuarkusService} from "../services/quarkus.service";
import {Game} from "../model/Game";
import {User} from "../model/User";
import {Router} from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {FormLoginComponent} from "../components/form-login/form-login.component";
import {CookieService} from "ngx-cookie-service";
import {UserLogged} from "../model/UserLogged";
import {DataService} from "../services/data.service";
import {FormRegisterComponent} from "../components/form-register/form-register.component";
import {AuthService} from "../services/auth.service";
import {LoginFormComponent} from "../components/login-form/login-form.component";




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
  public picture: string | undefined;

  constructor(private breakpointObserver: BreakpointObserver,
              private quarkus: QuarkusService,
              private cookieService: CookieService,
              private dataService: DataService,
              private router: Router,
              private dialog: MatDialog,
              private formBuilder: FormBuilder,
              private authService: AuthService) {
    this.form = this.formBuilder.group({
      newGameName: [
        this.newGameName,
        [Validators.required, Validators.minLength(3), Validators.maxLength(20)]
      ]
    });
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('token')){
      const tokenValue = sessionStorage.getItem('token')!.slice(1, -1);
      this.loggingWithGoogle(tokenValue);
      this.setProfilePicture()
      this.isConnected = true;
    }
    this.dataService.User$.subscribe((user) => {
      if (user) {
        this.user = user;
        this.isConnected = true;
      }
    });
  }

  isSmallScreen$ = this.breakpointObserver.observe([Breakpoints.Handset])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  openFormLogin() {
    //this.dialog.open(FormLoginComponent, {
    /*this.dialog.open(LoginFormComponent, {
      width: '100%',
      height: '45%',
    })*/
    this.router.navigate(['/login']);
  }


  logout() {
    this.cookieService.delete('qAuth');
    this.cookieService.delete('login');
    this.isConnected = false;
    this.router.navigate(['']);
  }

  getGamesByUser(){
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
    if (this.user) {
    const userId = this.user.id;
    this.router.navigate(['/game'], { queryParams: { gameId, userId } });
    }
  }

  submitInput() {
    if (this.form.valid) {
      if (this.isNewGameAvailable()) {
        const newGame = {
          gameName: this.form.get('newGameName')?.value,
          userId: this.user.id
        };
        this.quarkus.saveNewGame(newGame)
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

  loggingWithGoogle(googleToken: string) {
    this.authService.loginWithGoogle(googleToken).subscribe({
      next: data => {
        const expirationDate  = new Date();
        expirationDate .setHours(expirationDate.getHours() + 1);
        this.cookieService.set('login', JSON.stringify(data), expirationDate);
        this.getQuarkusAuthenticationToken({token: data.token, email: data.email})
        this.dataService.setUser({
          id: Number(data.userId),
          name: data.name,
          email: data.email,
        });
        this.isConnected = true;
      },
      error: error => {
        console.log(error);
      }
    })

    }

  getQuarkusAuthenticationToken(userLogged: UserLogged) {
    this.quarkus.authenticate(userLogged).subscribe({
      next: data => {
        this.cookieService.set('qAuth', JSON.stringify(data));
      },
      error: error => {
        console.log(error);
      }
    })
}

setProfilePicture() {
  const loggedInUserString = sessionStorage.getItem('loggedInUser');
  if (loggedInUserString !== null) {
    const loggedInUser = JSON.parse(loggedInUserString);
    this.picture = loggedInUser.picture;
  }
}




}
