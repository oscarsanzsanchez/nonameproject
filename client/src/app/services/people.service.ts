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
 
  getOne(id) {
    return this.http.get(`${this.BASEURL}/${id}`);
  }

  update(id, person: Person) {
    return this.http.put(`${this.BASEURL}/${id}`, person);
   }

  create(person: Person) {
   return this.http.post(`${this.BASEURL}/new`, person);
  }

  delete(id){
    return this.http.delete(`${this.BASEURL}/${id}`)
  }
}
