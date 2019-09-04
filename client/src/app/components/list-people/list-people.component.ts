import { Component, OnInit } from "@angular/core";
import { PeopleService } from "src/app/services/people.service";

@Component({
  selector: "app-list-people",
  templateUrl: "./list-people.component.html",
  styleUrls: ["./list-people.component.css"]
})
export class ListPeopleComponent implements OnInit {
  people: any = [];
  vacio: boolean = true;

  constructor(private peopleService: PeopleService) {}

  ngOnInit() {
    this.peopleService.getAll().subscribe(
      res => {
        if (!Object.keys(res).length) {
          return;
        }
        this.people = res;
        this.vacio = false;
      },
      error => {
        console.log(error);
      }
    );
  }
}
