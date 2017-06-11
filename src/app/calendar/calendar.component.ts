import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
	selector: 'app-calendar',
	template: `
  	<div id="my-div">
	    <h1>Choose date</h1>
	    <datetime 
	    [(ngModel)]="date"
	    (ngModelChange)="handleDateFromChange($event)"
	    ></datetime>
	</div>
	`,
	styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

	date: Date = new Date();
	@Output() selectedDate = new EventEmitter<Date>();

	constructor() { }

	ngOnInit() {

	}

	handleDateFromChange(date: Date) {
		this.selectedDate.emit(date);
	}
}
