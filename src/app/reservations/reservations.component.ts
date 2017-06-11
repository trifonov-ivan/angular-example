import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ReservationsService, TimeSlot, TimeFrame } from '../reservations.service';

@Component({
	selector: 'app-reservations',
	templateUrl: './reservations.component.html',
	styleUrls: ['./reservations.component.css']
})

export class ReservationsComponent implements OnInit {
	// instantiate reservations to an empty array
	@Output() onCancel = new EventEmitter();

	reservations: any = [];
	constructor(private reservationsService: ReservationsService) { }

	refresh(date: Date) {
		const self = this
		this.reservationsService.getAllReservations(new TimeFrame(date, TimeSlot.Day)).subscribe(reservations => {
			self.reservations = reservations;
		});
	}

	onChildCancel(event) {
		this.onCancel.emit(event);
	}

	ngOnInit() {
	}
}