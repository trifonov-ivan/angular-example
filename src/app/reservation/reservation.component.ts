import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ReservationsService, TimeSlot, TimeFrame } from '../reservations.service';
import * as moment from 'moment'

@Component({
	selector: 'app-reservation',
	templateUrl: './reservation.component.html',
	styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

	@Input() reservation: any
	@Output() onCancel = new EventEmitter();

	constructor(private reservationsService: ReservationsService) { }

	ngOnInit() {
		this.reservation.onDate = moment(new Date(this.reservation.startTime)).locale('ru').format('MMMM Do YYYY, hh:mm');
		this.reservation.length = new Number(Math.abs(this.reservation.endTime - this.reservation.startTime) / 36e5).toPrecision(1);
	}

	cancel() {
		let self = this;
		this.reservationsService.cancel(this.reservation).subscribe(result => {
			self.onCancel.emit(self.reservation);
		}, error => {
			self.onCancel.emit(self.reservation);
		})
	}
}
