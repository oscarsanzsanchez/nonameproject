import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  private BASEURL: string = "http://localhost:3000/api/payments";

  constructor(private http: HttpClient) { }

  getByPersonId(id) {
    return this.http.get(`${this.BASEURL}/person/${id}`);
  }
}
