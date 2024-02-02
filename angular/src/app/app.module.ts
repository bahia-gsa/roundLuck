import {NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatSelectModule} from "@angular/material/select";
import {MatMenuModule} from "@angular/material/menu";
import { HomeComponent } from './pages/home/home.component';
import { IndexComponent } from './pages/index/index.component';
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import { GameComponent } from './pages/game/game.component';
import { SelectedGameComponent } from './pages/selected-game/selected-game.component';
import {MatDialogModule} from "@angular/material/dialog";
import {CookieService} from 'ngx-cookie-service';
import {Interceptor} from "./services/interceptor";
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import {NgOptimizedImage} from "@angular/common";
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { AndroidAppComponent } from './components/android-app/android-app.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    IndexComponent,
    GameComponent,
    SelectedGameComponent,
    FooterComponent,
    AboutComponent,
    ContactComponent,
    ProfileComponent,
    LoginFormComponent,
    RegisterFormComponent,
    AndroidAppComponent,

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatDialogModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatSelectModule,
        MatMenuModule,
        MatInputModule,
        FormsModule,
        MatTableModule,
        ReactiveFormsModule,
        NgOptimizedImage
    ],
  providers: [CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
