import {
  Component,
  OnInit,
  HostBinding,
  Output,
  EventEmitter
} from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { first } from "rxjs/operators";
import { AppComponent } from "src/app/app.component";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  private username: string;
  private password: string;
  private error: string;
  private appName = this.app.title;

  constructor(
    private auth: AuthService,
    private router: Router,
    private app: AppComponent
  ) {}

  public submit() {
    if (this.username && this.password) {
      this.error = null;
      this.auth
      .login(this.username, this.password)
      .pipe(first())
      .subscribe(
        result => this.router.navigate(["/people"]),
        err => (this.error = "Could not authenticate")
      );
    }else {
      this.error = "Error";
    }
  }

  ngOnInit() {
    if (this.auth.loggedIn) {
      this.router.navigate(["/people"]);
    }
  }
}
