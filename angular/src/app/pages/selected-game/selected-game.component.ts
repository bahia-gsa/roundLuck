import {Component, OnInit} from '@angular/core';
import {Game} from "../../model/Game";
import {User} from "../../model/User";
import {ActivatedRoute} from "@angular/router";
import {QuarkusService} from "../../services/quarkus.service";
import {Player} from "../../model/Player";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-selected-game',
  templateUrl: './selected-game.component.html',
  styleUrls: ['./selected-game.component.scss']
})
export class SelectedGameComponent implements OnInit{

  user!: User;
  selectedGame!: Game;
  players:Player[] = [];
  filteredDataSource: Player[] = [];

  displayedColumns: string[] = ['playerName', 'drawn', "delete"];
  displayedColumnsDraws: string[] = ['playerName', 'createdAt'];
  selectedPlayer!: Player;
  chosenPlayer: Player | null = null;
  draws: Player[] = [];
  newPlayerName: string = "";
  newPlayerEmail: string = "";
  errorMessage: string = '';
  playerForm!: FormGroup;


  constructor(private route: ActivatedRoute,
              private quarkus: QuarkusService,
              private formBuilder: FormBuilder) {}


  ngOnInit(): void {
    this.playerForm = this.formBuilder.group({
      newPlayerName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
      newPlayerEmail: ['', [Validators.required, Validators.email]]
    });

    this.route.queryParams.subscribe(params => {
      this.loadGame(params['gameId']);
      this.loadPlayers(params['gameId']);
      this.loadDraws(params['gameId']);
    });
  }

  private loadGame(gameId: number){
    this.quarkus.getGamesById(gameId)
      .subscribe({
        next: data => {
          this.selectedGame = data;
        },
        error: error => {
          console.log("error", error);
        }
      })
  }


  private loadPlayers(gameId: number){
    this.quarkus.getPlayerByGame(gameId)
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

  private loadDraws(gameId: number){
    this.quarkus.getDrawsByGame(gameId)
      .subscribe({
        next: data => {
          this.draws = data;
        }
      });
  }

  selectPlayer(player: Player){
    this.selectedPlayer = player;
  }

  nextRound() {
    this.chosenPlayer = null;
    setTimeout(() => {
      this.quarkus.drawPlayer(this.selectedGame.id).subscribe({
        next: data => {
          this.chosenPlayer = data;
          console.log("chosenPlayer", this.chosenPlayer);
          this.loadPlayers(this.selectedGame.id);
          this.loadDraws(this.selectedGame.id);
        },
        error: error => {
          console.log("error", error);
        }
      });
    }, 2000);
  }

  action(){
    this.toggleAnimation()
    this.nextRound();
  }

  submitInput() {
    this.quarkus.saveNewPlayer({
      playerName: this.playerForm.get('newPlayerName')?.value,
      playerEmail: this.playerForm.get('newPlayerEmail')?.value,
      game: { id: this.selectedGame.id }
    })
      .subscribe({
        next: data => {
          this.errorMessage = '';
          this.loadPlayers(this.selectedGame.id);
          this.playerForm.reset();
        },
        error: error => {
          this.errorMessage = error.error.parameterViolations[0].message;
        }
      });
  }

  playAnimation = false;

  toggleAnimation() {
    this.playAnimation = true;
    setTimeout(() => {
      this.playAnimation = false;
    }, 3000);
  }


  delete(id: number) {
    const isConfirmed = window.confirm('Are you sure you want to delete this player?');
    if (isConfirmed) {
      this.quarkus.deletePlayer(id).subscribe({
        next: data => {
          this.loadPlayers(this.selectedGame.id);
        },
        error: error => {
          console.log("error", error);
        }
      });
    }
  }
}





