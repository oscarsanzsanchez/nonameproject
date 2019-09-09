import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListPeopleComponent } from "./components/list-people/list-people.component";
import { FormpeopleComponent } from "./components/formpeople/formpeople.component";
import { FormservicesComponent } from "./components/formservices/formservices.component";
import { AuthGuard } from "./auth.guard";
import { LoginComponent } from "./components/login/login.component";

const routes: Routes = [
  {
    path: "people",
    component: ListPeopleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "people/new",
    component: FormpeopleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "services/new",
    component: FormservicesComponent,
    canActivate: [AuthGuard]
  },
  { path: "login", component: LoginComponent },
  {
    path: "people/:id",
    component: FormpeopleComponent
  },
  {
    path: "",
    redirectTo: "people",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
