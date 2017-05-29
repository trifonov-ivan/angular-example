import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

enum TimeSlot {
	Day = 1,
	Week
}

class TimeFrame {
	from: Date;
	to: Date;

	constructor(from: Date = new Date(), timeSlot: TimeSlot) {
		switch (timeSlot) {
			case TimeSlot.Day:
				from.setHours(0, 0, 0, 0);
				this.from = new Date(from)
				this.to = new Date(from)
				this.to.setDate(this.to.getDate() + 1);
				break;
			case TimeSlot.Week:
				let d = new Date(from);
  				let day = d.getDay(),
      			diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
  				this.from = new Date(d.setDate(diff));
  				this.to = new Date(d.setDate(diff + 7));
  				console.log(this.to);
				break;
		}
	}
}

@Injectable()
export class ReservationsService {

  constructor(private http: Http) { }

  // Get all posts from the API
  getAllReservations(timeframe: TimeFrame = new TimeFrame(new Date(), TimeSlot.Week) ) {
    return this.http.get('/api/reservations?fromTime=' + timeframe.from.getTime() + '&toTime=' + timeframe.to.getTime())
      .map(res => res.json());
  }
}