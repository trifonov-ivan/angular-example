import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ReservationsService {

  constructor(private http: Http) { }

  // Get all posts from the API
  getAllReservations() {
    return this.http.get('/api/reservations')
      .map(res => res.json());
  }
}