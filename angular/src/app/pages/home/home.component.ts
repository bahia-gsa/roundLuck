import { Component, OnInit } from '@angular/core';
import {QuarkusService} from "../../services/quarkus.service";
import {DataService} from "../../services/data.service";
import {User} from "../../model/User";
import {Game} from "../../model/Game";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  newGame: string = "";
  user!: User;

  displayedColumns: string[] = ['gameName', 'createdAt'];
  dataSource!: Game[];
  selectedGame!: Game;

  constructor(private quarkus: QuarkusService,
              private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.initUser();

  }

  submitInput() {
    this.quarkus.saveNewGame({ gameName: this.newGame, userId: this.user.id})
      .subscribe({
        next: data => {

        },
        error: error => {
          console.log("error", error);
        }
      });
  }

  selectGame(game: Game){
    this.selectedGame = game;
    console.log("selectedGame", this.selectedGame);
  }


  private initUser(){
    this.dataService.User$.subscribe(data => {
      if (data) {
        this.user = data;
        this.getGamesByUser();
      }
    });
  }

  private getGamesByUser(){
    this.quarkus.getGamesByUser(this.user.id)
      .subscribe({
        next: data => {
          this.dataSource = data;
        },
        error: error => {
        }
      });
  }

}
