import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavigationBarComponent } from "./components/navigation-bar/navigation-bar.component";
import { ListPeopleComponent } from "./components/list-people/list-people.component";

import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { PeopleService } from "./services/people.service";
import { FormpeopleComponent } from "./components/formpeople/formpeople.component";
import { FormservicesComponent } from "./components/formservices/formservices.component";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { LoginComponent } from "./components/login/login.component";
//#############################################
import { JwtModule } from "@auth0/angular-jwt";
import { AuthGuard } from './auth.guard';
import { AuthService } from './services/auth.service';
export function tokenGetter() {
  return localStorage.getItem("access_token");
}
//#############################################

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    ListPeopleComponent,
    FormpeopleComponent,
    FormservicesComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
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
    })
  ],
  providers: [PeopleService, AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
