import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let token: string = localStorage.getItem("token");
    if (this.authService.loggedIn &&  !this.authService.isTokenExpired) {
      return true;
    }

    this.router.navigate(["login"]);
    return false;
  }
}
