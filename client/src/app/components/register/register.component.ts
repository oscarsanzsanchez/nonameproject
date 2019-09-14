import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { AppComponent } from "src/app/app.component";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MustMatch } from "../helpers/must-match.validator";

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

  registerForm: FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router,
    private app: AppComponent,
    private fb: FormBuilder
  ) {}

  createForm() {
    this.registerForm = this.fb.group(
      {
        username: ["", Validators.required],
        password: ["", [Validators.required, Validators.minLength(4)]],
        confirmPassword: ["", [Validators.required, Validators.minLength(4)]]
      },
      { validator: MustMatch("password", "confirmPassword") }
    );
  }

  get f() {
    return this.registerForm.controls;
  }

  public async submit() {
    if (this.registerForm.valid) {
      this.username = this.registerForm.controls['username'].value;
      this.password = this.registerForm.controls['password'].value;
      await this.auth
        .register(this.username, this.password)
        .toPromise()
        .then(res => {
          this.router.navigate(["/"]);
        });
    }
  }

  ngOnInit() {
    if (this.auth.loggedIn) {
      this.router.navigate(["/"]);
    }
    this.createForm();
  }
}
