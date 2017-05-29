
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

reservations.reservations = function(fromTime, toTime) {
	var array = new Array();
	db.forEach(function(key, val) {
		if (val != null) {
			var timestamp = Number(key.substring(0, key.indexOf('_')));
			if (fromTime < timestamp && toTime > timestamp) {
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