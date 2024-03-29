import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {CookieService} from "ngx-cookie-service";

@Injectable()
export class Interceptor implements HttpInterceptor {

  token!: string;

  private readonly excludeAuthenticate = `${environment.baseUrlQuarkus}/auth/authenticate`;
  private readonly excludeContact = `${environment.baseUrlQuarkus}/contact`;


  constructor(private cookieService: CookieService ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     if (req.url.includes(environment.baseUrlQuarkus) && req.url !== this.excludeAuthenticate && req.url !== this.excludeContact) {
       if (this.cookieService.check('qAuth')) {
         this.token = JSON.parse(decodeURIComponent(this.cookieService.get('qAuth')));
       }
       const authReq = req.clone({
        setHeaders: {
          authorization: `Bearer ${this.token}`
        }
      });
      return next.handle(authReq);
    }

    return next.handle(req);
  }

}
