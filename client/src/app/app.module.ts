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
import { FormservicesComponent } from './components/formservices/formservices.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    ListPeopleComponent,
    FormpeopleComponent,
    FormservicesComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [PeopleService],
  bootstrap: [AppComponent]
})
export class AppModule {}
