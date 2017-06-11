import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

export enum TimeSlot {
	Day = 1,
	Week
}

export class TimeFrame {
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

  getAllTables(date: Date = new Date()) {
  	return this.http.get('/api/tables?at='+date.getTime())
    .map(res => res.json());
  }

  reserve(object) {
  	let headers = new Headers ({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, method: "post" });
    return this.http.post('/api/reserve', JSON.stringify(object), options);
  }

  cancel(reservation) {
    let object = {
      startTime: reservation.startTime,
      table: reservation.table
    }
    let headers = new Headers ({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, method: "post" });
    return this.http.post('/api/cancel', JSON.stringify(object), options);
  }
}