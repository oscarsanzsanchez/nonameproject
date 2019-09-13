import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private BASEURL: string = "http://localhost:3000/api/auth";

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private cookies: CookieService
  ) {}

  login(username: string, password: string): Observable<boolean> {
    return this.http
      .post<{ token: string }>(`${this.BASEURL}/login`, {
        username: username,
        password: password
      })
      .pipe(
        map(result => {
          this.cookies.set("nonameapp_accessToken", result.token);
          return true;
        })
      );
  }

  register(username: string, password: string) {
    return this.http.post(`${this.BASEURL}/register`, {
      username: username,
      password: password,
      role: "ADMIN"
    });
  }

  logout() {
    this.cookies.delete("nonameapp_accessToken");
  }

  public get getToken(): string {
    return this.cookies.get("nonameapp_accessToken");
  }

  public get loggedIn(): boolean {
    return this.cookies.check("nonameapp_accessToken");
  }

  public get isTokenExpired(): boolean {
    return this.jwtHelper.isTokenExpired(this.getToken);
  }
}
