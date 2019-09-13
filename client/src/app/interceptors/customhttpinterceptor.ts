import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: "root"
})
export class CustomhttpinterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService){}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      headers: request.headers.set("Content-Type", "application/json")
    });
    if (!request.headers.has("Accept")) {
      request = request.clone({
        headers: request.headers.set("Accept", "application/json")
      });
    }
    if (this.authService.loggedIn) {
      if (!request.headers.has("auth")) {
        request = request.clone({
          headers: request.headers.set("auth", this.authService.getToken)
        });
      }
    }

    //request = request.clone({headers: request.headers.set('Accept-Language', 'fr-FR')});

    return next.handle(request);
  }
}
