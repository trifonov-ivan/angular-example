import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ReservationsService, TimeSlot, TimeFrame } from '../reservations.service';

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
		let d = new Date(this.reservation.startTime);
		var curr_date = d.getDate();
		var curr_month = d.getMonth() + 1;
		var curr_year = d.getFullYear();

		this.reservation.onDate = curr_year + "-" + curr_month + "-" + curr_date + " " + 
			d.getHours() + ":" + d.getMinutes();
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
