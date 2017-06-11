import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { TableSelectorComponent } from '../table-selector/table-selector.component'
import { ReservationsComponent } from '../reservations/reservations.component'
import { ReserveComponent } from '../reserve/reserve.component'

import { Subject } from 'rxjs/Subject';

@Component({
	selector: 'app-admin-lookup',
	templateUrl: './admin-lookup.component.html',
	styleUrls: ['./admin-lookup.component.css'],
})

export class AdminLookupComponent implements OnInit {

	date: Date;
 	
 	@ViewChild(TableSelectorComponent)
  	private tablesComponent: TableSelectorComponent;
	
 	@ViewChild(ReservationsComponent)
  	private reservationsComponent: ReservationsComponent;

 	@ViewChild(ReserveComponent)
  	private reserveComponent: ReserveComponent;

	constructor() { }

	ngOnInit() {
	}

	datePipe(date) {
		this.date = date;
		this.tablesComponent.getTablesJSON(date);
		this.reservationsComponent.refresh(date);
	}

	tablePipe(table) {
		this.reserveComponent.active = true;
		this.reserveComponent.table = table.id;
	}

	promoteCancel(event) {
		this.tablesComponent.getTablesJSON(this.date);
		this.reservationsComponent.refresh(this.date);
	}

	reservationDone(event) {
		this.tablesComponent.getTablesJSON(this.date);
		this.reservationsComponent.refresh(this.date);
	}
}
