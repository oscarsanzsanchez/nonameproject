import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import Service from "src/app/models/service";
import { ServicesService } from "src/app/services/services.service";

@Component({
  selector: "app-formservices",
  templateUrl: "./formservices.component.html",
  styleUrls: ["./formservices.component.css"]
})
export class FormservicesComponent implements OnInit {
  service: Service = {
    id: 0,
    name: "",
    price: 0,
    pricePerPerson: 0
  };
  constructor(
    private servicesService: ServicesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}

  resetForm() {
    this.service = {
      id: 0,
      name: "",
      price: 0,
      pricePerPerson: 0
    };
  }

  sendForm() {
    console.log(this.service);
    this.servicesService.create(this.service).subscribe(res => {
      //this.router.navigate(['/'])
    });
    //this.resetForm();
  }
}
