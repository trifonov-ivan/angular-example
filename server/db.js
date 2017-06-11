
var events = require('events');
var dirty = require('dirty');
var db = dirty('reservations.db');

var reservations = new events.EventEmitter();

/*
reservation object {
	name
	contactPhone
	table
	startTime
	endTime
}

additional methods {
	cancel()
}

db structure
pending reservations
active reservations

*/
function key(reservation) {
	return reservation.startTime + "_" + reservation.table.toString();
}

reservations.reserve = function(reservation) {
	db.set(key(reservation), reservation);
};

reservations.cleanup = function() {
	db.forEach(function(key, val) {	
		db.rm(key);
	});
};

reservations.remove = function(startTime, table) {
	
}

reservations.reservations = function(fromTime, toTime) {
	var array = new Array();
	db.forEach(function(key, val) {
		if (val != null) {
			if ((fromTime <= val.startTime && toTime >= val.startTime) || (val.startTime <= fromTime && val.endTime >= fromTime)) {
				array.push(val);
			}			
		}
	});
	console.log(array);
	return array;
}

reservations.reservationsAt = function(atTime) {
	var array = new Array();
	db.forEach(function(key, val) {
		if (val != null) {
			if (val.startTime <= atTime && val.endTime >= atTime) {
				array.push(val);
			}			
		}
	});
	return array;
}

db.on('load', function() {
	reservations.emit('load');
});

module.exports = reservations;