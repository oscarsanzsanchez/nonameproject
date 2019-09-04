import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import Person from "src/app/models/person";
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

  person: Person = {
    id: 0,
    name: "",
    surname: "",
    fee: 0,
    services: []
  };

  numPeoplePerService: any = [];

  constructor(
    private servicesService: ServicesService,
    private peopleService: PeopleService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.servicesService.getAll().subscribe(res => {
      this.services = res;
      this.servicesService.getCount().subscribe(res => {
        this.numPeoplePerService = res;
        console.log(this.numPeoplePerService);
        for (let index = 0; index < this.services.length; index++) {
          const servi = this.services[index];
          let ser = {
            id: servi.id,
            name: servi.name,
            checked: false,
            price: servi.price,
            pricePerPerson:
              servi.price /
              (Number.parseInt(
                this.numPeoplePerService.find(x => x.serviceId === servi.id)
                  .numPersons
              ) +
                1)
          };

          this.servicesCheck.push(ser);
        }
      });

      console.log(this.servicesCheck);
    });
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
    this.servicesCheck.forEach(ser => {
      if (ser.checked) {
        this.person.services.push(ser);
      }
    });
    console.log(this.person);
    this.peopleService.create(this.person).subscribe(res => {
      // this.router.navigate(["/"]);
    });
    this.resetForm();
  }

  checkTotal(service) {
    service.checked = !service.checked;

    if (service.checked) {
      this.person.fee += service.pricePerPerson;
    } else if (!service.checked) {
      this.person.fee -= service.pricePerPerson;
    }
  }
}
