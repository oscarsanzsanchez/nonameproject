import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import Person from "../models/person";

@Injectable({
  providedIn: "root"
})
export class PeopleService {
  private BASEURL: string = "http://localhost:3000/api/people";

  constructor(private http: HttpClient) {
  }

  getAll() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("auth", localStorage.getItem("token"));
    return this.http.get(`${this.BASEURL}`, { headers: headers });
  }

  getOne(id) {
    return this.http.get(`${this.BASEURL}/${id}`);
  }

  update(id, person: Person) {
    return this.http.put(`${this.BASEURL}/${id}`, person);
  }

  create(person: Person) {
    return this.http.post(`${this.BASEURL}/new`, person);
  }

  delete(id) {
    return this.http.delete(`${this.BASEURL}/${id}`);
  }
}
