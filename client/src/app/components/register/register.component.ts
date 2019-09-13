import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { AppComponent } from "src/app/app.component";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  private username: string;
  private password: string;
  private error: string;
  private appName = this.app.title;

  constructor(
    private auth: AuthService,
    private router: Router,
    private app: AppComponent
  ) {}

  public async submit() {
    await this.auth.register(this.username, this.password).toPromise().then(res => {
      this.router.navigate(["/"])
    })
   
    /* this.auth
      .register(this.username, this.password)
      .pipe(first())
      .subscribe(
        result => ,
        err => (this.error = "Could not authenticate")
      ); */
  }

  ngOnInit() {
    if (this.auth.loggedIn) {
      this.router.navigate(["/"]);
    }
  }
}
