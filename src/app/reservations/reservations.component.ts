import { Component, OnInit } from '@angular/core';
import { ReservationsService } from '../reservations.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})

export class ReservationsComponent implements OnInit {
  // instantiate reservations to an empty array
  reservations: any = [];

  constructor(private reservationsService: ReservationsService) { }

  ngOnInit() {
    // Retrieve reservations from the API
    this.reservationsService.getAllReservations().subscribe(reservations => {
      this.reservations = reservations;
    });
  }
}