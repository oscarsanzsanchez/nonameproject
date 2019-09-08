import { Component, OnInit } from "@angular/core";
import { PeopleService } from "src/app/services/people.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-list-people",
  templateUrl: "./list-people.component.html",
  styleUrls: ["./list-people.component.css"]
})
export class ListPeopleComponent implements OnInit {
  people: any = [];
  vacio: boolean = true;
  loading:boolean = true;

  constructor(private peopleService: PeopleService, private router: Router) {}

  ngOnInit() {
    this.init();
  }

  private async init() {
    const res = await this.peopleService.getAll().toPromise();
    if (!Object.keys(res).length) {
      this.loading = false;
      return;
    } else {
      this.people = res;
      this.vacio = false;
      this.loading = false;
    }
    
  }

  private async delete(id) {
    this.loading = true;
    await this.peopleService.delete(id).toPromise();
    this.people = await this.peopleService.getAll().toPromise();
    window.location.reload();
  }
}
