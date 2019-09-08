import { Component, OnInit } from "@angular/core";
import { PeopleService } from "src/app/services/people.service";
import { Router } from "@angular/router";
import { PaymentsService } from "src/app/services/payments.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list-people",
  templateUrl: "./list-people.component.html",
  styleUrls: ["./list-people.component.css"]
})
export class ListPeopleComponent implements OnInit {
  people: any = [];
  vacio: boolean = true;
  loading: boolean = true;

  constructor(
    private peopleService: PeopleService,
    private paymentService: PaymentsService,
    private router: Router
  ) {}

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
    await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Let's drop that!",
      cancelButtonText: "Keep it"
    }).then(async result => {
      if (result.value) {
        this.peopleService
          .delete(id)
          .toPromise()
          .then(res => {
            Swal.fire(
              "Deleted!",
              "The person and all his data has been deleted.",
              "success"
            );
          });
        window.location.reload();
      }
    });
  }
}
