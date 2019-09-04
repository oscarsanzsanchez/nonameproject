import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import Person from "../models/person";

@Injectable({
  providedIn: "root"
})
export class PeopleService {
  private BASEURL: string = "http://localhost:3000/api/people";

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(`${this.BASEURL}`);
  }

  create(person: Person) {
   return this.http.post(`${this.BASEURL}/new`, person);
  }
}
