import { Component, OnInit } from '@angular/core';
import { ReservationsService, TimeSlot, TimeFrame } from '../reservations.service';

@Component({
	selector: 'app-reservations',
	templateUrl: './reservations.component.html',
	styleUrls: ['./reservations.component.css']
})

export class ReservationsComponent implements OnInit {
	// instantiate reservations to an empty array
	reservations: any = [];
	constructor(private reservationsService: ReservationsService) { }


	refresh(date: Date) {
		const self = this
		this.reservationsService.getAllReservations(new TimeFrame(date, TimeSlot.Day)).subscribe(reservations => {
			self.reservations = reservations.map(reservation => {
				let d = new Date(reservation.startTime);
				var curr_date = d.getDate();
				var curr_month = d.getMonth() + 1;
				var curr_year = d.getFullYear();

				reservation.onDate = curr_year + "-" + curr_month + "-" + curr_date;
				reservation.length = new Number(Math.abs(reservation.endTime - reservation.startTime) / 36e5).toPrecision(1);
				return reservation;
			});
			console.log(JSON.stringify(self.reservations));
		});
	}

	ngOnInit() {
	}
}