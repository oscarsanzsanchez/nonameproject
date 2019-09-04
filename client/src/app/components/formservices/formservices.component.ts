import { Component, OnInit } from "@angular/core";
import Service from "src/app/models/service";
import { ServicesService } from "src/app/services/services.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-formservices",
  templateUrl: "./formservices.component.html",
  styleUrls: ["./formservices.component.css"]
})
export class FormservicesComponent implements OnInit {
  service: Service = {
    id: 0,
    name: "",
    price: 0
  };
  constructor(
    private servicesService: ServicesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {}

  resetForm() {
    this.service = {
      id: 0,
      name: "",
      price: 0
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
