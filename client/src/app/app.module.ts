import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavigationBarComponent } from "./components/navigation-bar/navigation-bar.component";
import { ListPeopleComponent } from "./components/list-people/list-people.component";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PeopleService } from "./services/people.service";
import { FormpeopleComponent } from "./components/formpeople/formpeople.component";
import { FormservicesComponent } from "./components/formservices/formservices.component";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { LoginComponent } from "./components/login/login.component";

import { JwtModule } from "@auth0/angular-jwt";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./services/auth.service";
import { CustomhttpinterceptorService } from "./interceptors/customhttpinterceptor";
import { CookieService } from 'ngx-cookie-service';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

export function tokenGetter() {
  return new AuthService(this.HttpClient, this.JwtHelperService, this.CookieService).getToken;
}

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    ListPeopleComponent,
    FormpeopleComponent,
    FormservicesComponent,
    LoginComponent,
    RegisterComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SweetAlert2Module.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:4000"],
        blacklistedRoutes: ["localhost:4000/api/auth"]
      }
    }),
    ReactiveFormsModule
  ],
  providers: [
    PeopleService,
    AuthGuard,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomhttpinterceptorService,
      multi: true
    },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
