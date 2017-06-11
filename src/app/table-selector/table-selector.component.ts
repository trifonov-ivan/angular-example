import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { ReservationsService } from '../reservations.service';
import { Subject } from 'rxjs/Subject';

import 'fabric';
declare const fabric: any;

@Component({
	selector: 'app-table-selector',
	templateUrl: './table-selector.component.html',
	styleUrls: ['./table-selector.component.css']
})

export class TableSelectorComponent implements OnInit {

	canvas: any;
	reservationsInfo: any = {};
	@Output() selectedTable = new EventEmitter();
	
	constructor(private reservationsService: ReservationsService) { }

	getTablesJSON(date: Date) {
		console.log("obtaining tables for " + date.getTime())
		var self = this;
		this.reservationsService.getAllTables(date).subscribe(tables => {
			self.canvas.clear();
			self.canvas.loadFromJSON(tables.tables, self.canvas.renderAll.bind(self.canvas), function(jsonObject, fabricObject) {				

				self.reservationsInfo = tables.reservations;
				fabricObject.id = jsonObject.id;
				const reservation = tables.reservations[jsonObject.id]
				if (reservation) {
					fabricObject.fill = "red";
				} else {
					fabricObject.fill = null;
					fabricObject.stroke = true;
				}
				fabricObject.selectable = false;
			});
		});
	}

	ngOnInit() {
		var self = this;
		this.canvas = new fabric.Canvas("c", {
			selection: false,
		});

		this.canvas.on('mouse:up', evt => {
			if (evt.target && evt.target.id) {
				self.selectedTable.emit({
					id: evt.target.id,
					reservation: self.reservationsInfo[evt.target.id]
				});
			}
		});
	}
}
