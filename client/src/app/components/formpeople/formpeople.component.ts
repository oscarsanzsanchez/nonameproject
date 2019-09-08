import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PeopleService } from "src/app/services/people.service";
import { ServicesService } from "src/app/services/services.service";

@Component({
  selector: "app-formpeople",
  templateUrl: "./formpeople.component.html",
  styleUrls: ["./formpeople.component.css"]
})
export class FormpeopleComponent implements OnInit {
  services: any = [];
  servicesCheck: any = [];
  counts: any = [];

  person: any = {
    id: 0,
    name: "",
    surname: "",
    fee: 0,
    services: []
  };

  editMode: boolean = false;

  constructor(
    private servicesService: ServicesService,
    private peopleService: PeopleService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    /* if (this.route.snapshot.params.id) {
      this.peopleService
        .getOne(this.route.snapshot.params.id)
        .subscribe(res => {
          this.person = res;
          this.editMode = true;
        });
    } */

    this.prepareAll();
  }

  async prepareAll() {
    let { id } = this.route.snapshot.params;
    if (id) {
      this.editMode = true;
      this.person = await this.peopleService.getOne(id).toPromise();
    }

    this.services = await this.servicesService.getAll().toPromise();
    this.counts = await this.servicesService.getCount().toPromise();

    for (const service of this.services) {
      let serviceCheck = {
        id: service.id,
        name: service.name,
        price: service.price,
        pricePerPerson: service.pricePerPerson,
        checked: false
      };
      let numPersons = Number.parseInt(
        this.counts.find(x => x.id === serviceCheck.id).count
      );

      /* if (this.editMode && numPersons === 0) {
        numPersons = 1;
      } */

      if (!this.editMode) {
        serviceCheck.pricePerPerson =
          Math.round((serviceCheck.price / (numPersons + 1)) * 100) / 100;
      } else if (
        this.editMode &&
        this.person.services.find(x => x.id === serviceCheck.id)
      ) {
        serviceCheck.checked = true;
      }

      this.servicesCheck.push(serviceCheck);
    }
  }

  resetForm() {
    this.person = {
      id: 0,
      name: "",
      surname: "",
      fee: 0,
      services: []
    };

    this.servicesCheck.forEach(ser => {
      ser.checked = false;
    });
  }

  sendForm() {
    this.person.services = [];
    this.servicesCheck.forEach(ser => {
      if (ser.checked) {
        this.person.services.push(ser);
      }
    });

    if (this.editMode) {
      this.peopleService.update(this.person.id, this.person).subscribe(res => {
        this.router.navigate(["/"]);
        this.resetForm();
      });
    } else {
      this.peopleService.create(this.person).subscribe(res => {
        this.router.navigate(["/"]);
        this.resetForm();
      });
    }
  }

  checkTotal(service) {
    service.checked = !service.checked;
    let servicesWithCheck = this.servicesCheck.filter(x => x.checked === true);
    this.person.fee = 0;
    for (const ser of servicesWithCheck) {
      this.person.fee += ser.pricePerPerson;
    }
  }
}
