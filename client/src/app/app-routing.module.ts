import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListPeopleComponent } from "./components/list-people/list-people.component";
import { FormpeopleComponent } from "./components/formpeople/formpeople.component";
import { FormservicesComponent } from "./components/formservices/formservices.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "people",
    pathMatch: "full"
  },
  {
    path: "people",
    component: ListPeopleComponent
  },
  {
    path: "people/new",
    component: FormpeopleComponent
  },
  {
    path: "services/new",
    component: FormservicesComponent
  },
  {
    path: "people/:id",
    component: FormpeopleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
