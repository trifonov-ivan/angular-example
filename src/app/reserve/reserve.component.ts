import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReservationsService, TimeSlot, TimeFrame } from '../reservations.service';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent implements OnInit {

	table = 1;
	active = false;

	@Output() selectedDate = new EventEmitter<Date>();

	constructor(private reservationsService: ReservationsService) { }

	ngOnInit() {

	}

	onSubmit(form) {
		var postObject = form.value;
		var fromDate = new Date(postObject.fromTime).getTime();
		var toDate = fromDate + 2 * 3600 * 1000;
		postObject.fromTime = fromDate;
		postObject.toTime = toDate;
		console.log(postObject);

		this.reservationsService.reserve(postObject).subscribe(response => {
			console.log("response");
		})
	}
}
