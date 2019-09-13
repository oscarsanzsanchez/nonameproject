import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import Service from "../models/service";

@Injectable({
  providedIn: "root"
})
export class ServicesService {
  private BASEURL: string = "http://localhost:3000/api/services";

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(`${this.BASEURL}`);
  }

  create(service: Service) {
    return this.http.post(`${this.BASEURL}/new`, service);
  }

  getCount() {
    return this.http.get(`${this.BASEURL}/countpeople/all`);
  }
}
