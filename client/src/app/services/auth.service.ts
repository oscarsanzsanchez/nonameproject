import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASEURL: string = "http://localhost:3000/api/auth";

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<{token: string}>(`${this.BASEURL}/login`, {username: username, password: password})
      .pipe(
        map(result => {
          localStorage.setItem('token', result.token);
          return true;
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('token') !== null);
  }
}
