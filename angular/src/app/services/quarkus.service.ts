import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {UserLogged} from "../model/UserLogged";


@Injectable({
  providedIn: 'root'
})
export class QuarkusService {

  constructor(private http: HttpClient) { }

  public authenticate(user: UserLogged) : Observable<any>   {
    return this.http.post(environment.baseUrlQuarkus + '/auth/authenticate', user, { responseType: 'text' });
  }

  public checkUserExists() : Observable<any>   {
    return this.http.get(environment.baseUrlQuarkus + '/users/checkUser');
  }

  public saveNewGame(newGame: { gameName: string, user: { id: number } }): Observable<any> {
    return this.http.post(environment.baseUrlQuarkus + '/games', newGame);
  }

  public  deleteGame(gameId: number): Observable<any> {
    return this.http.delete(environment.baseUrlQuarkus + '/games/' + gameId);
  }

  public getGamesByUser(userId: number): Observable<any> {
    return this.http.get(environment.baseUrlQuarkus + '/games/user/' + userId);
  }

  public getGamesById(gameId: number): Observable<any> {
    return this.http.get(environment.baseUrlQuarkus + '/games/' + gameId)
  }

  public getPlayerByGame(gameId: number): Observable<any> {
    return this.http.get(environment.baseUrlQuarkus + '/players/' + gameId);
  }

  public saveNewPlayer(newPlayer: { playerName: string, playerEmail?: string, game: { id: number } }): Observable<any> {
    return this.http.post(environment.baseUrlQuarkus + '/players', newPlayer);
  }

  public deletePlayer(playerId: number): Observable<any> {
    return this.http.delete(environment.baseUrlQuarkus + '/players/' + playerId);
  }

  public drawPlayer(gameId: number): Observable<any> {
    return this.http.get(environment.baseUrlQuarkus + '/draws/draw/' + gameId);
  }

  public getDrawsByGame(gameId: number): Observable<any> {
    return this.http.get(environment.baseUrlQuarkus + '/draws/' + gameId);
  }

}
