import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {from, Observable, switchMap} from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable()
export class Interceptor implements HttpInterceptor {


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        throw new Error('Method not implemented.');
    }
/*
  constructor(private keycloakService: KeycloakService) {}


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes(environment.baseUrlQuarkus)) {
      return from(this.keycloakService.getToken().then(token => {
        if (token) {
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
        }
        return req;
      })).pipe(
        switchMap(req => next.handle(req))
      );
    }
    return next.handle(req);
  }


*/


}
