import {Component, Input, OnInit} from '@angular/core';
import {Game} from "../../model/Game";
import {User} from "../../model/User";
import {QuarkusService} from "../../services/quarkus.service";
import {Player} from "../../model/Player";


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit{

  @Input() selectedGame!: Game;
  @Input() user!: User;
  newPlayerName: string = "";
  players: Player[] = [];


  displayedColumns: string[] = ['playerName', 'drawn', 'createdAt'];
  filteredDataSource!: Player[];

  selectedPlayer!: Player;

  constructor(private quarkus: QuarkusService) { }

  ngOnInit(): void {
    this.loadPlayers();
  }

  private loadPlayers(){
    this.quarkus.getPlayerByGame(this.selectedGame.id)
      .subscribe({
        next: data => {
          this.players = data;
          this.filteredDataSource = this.players.filter(player => player.active);
        },
        error: error => {
          console.log("error", error);
        }
      });
  }

  submitInput() {
    this.quarkus.saveNewPlayer({ playerName: this.newPlayerName, game: { id: this.selectedGame.id } })
      .subscribe({
        next: data => {
          this.loadPlayers();
        },
        error: error => {
          console.log("error", error);
        }
      });
  }

  selectPlayer(player: Player){
    this.selectedPlayer = player;
    console.log("selectedPlayer", this.selectedPlayer);
  }

}
