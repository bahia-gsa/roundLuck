import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {IndexComponent} from "./pages/index/index.component";
import {SelectedGameComponent} from "./pages/selected-game/selected-game.component";


const routes: Routes = [

  { path: "", component: IndexComponent },
  { path: "home", component: HomeComponent},
  {path: "game", component: SelectedGameComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
