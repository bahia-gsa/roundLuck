import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {CookieService} from "ngx-cookie-service";

@Injectable()
export class Interceptor implements HttpInterceptor {

  token!: string;

  constructor(private cookieService: CookieService ) {
    const encodedCookieValue = this.cookieService.get('qAuth');
    if (encodedCookieValue) {
      this.token = JSON.parse(decodeURIComponent(encodedCookieValue));
      console.log("tokeenn: ", this.token);
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   if (req.url.includes(environment.baseUrlQuarkus) && this.token) {
      const authReq = req.clone({
        setHeaders: {
          authorization: `Bearer ${this.token}`
        }
      });
      console.log('Request headers:', authReq.headers);
      return next.handle(authReq);
    }

    return next.handle(req);
  }

}
