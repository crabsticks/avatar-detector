

/*
 update sl_Register.attendence SET departure = NOW() WHERE location = 1 AND name NOT IN ('Canary Beck', 'franklin Resident');
*/

var mysql = require("mysql");
var conn  = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "commandline"
});

conn.connect();

module.exports = {

    current: function(location, callback) {
	conn.query("SELECT name FROM sl_Register.attendence WHERE location = ( SELECT id FROM sl_Register.location WHERE name = ? ) AND departure IS NULL", [ location ], function(err, rows, fields) {
	    if (err) console.log("error: " + err);
	    if (err) return callback(err);
	    callback(null, rows.map( function(e) {
		return e.name;
	    }));
	});
    },

    is_in_attendence: function(location, avatar, callback) {
	conn.query("SELECT * FROM sl_Register.attendence WHERE name = ? AND location = ( SELECT id FROM sl_Register.location WHERE name = ? ) AND departure IS NULL", [ location, avatar ], function(err, rows, fields) {
	    console.log(rows);
	});
    },

    process_arrivals: function(location, logged, callback) {
	if ( logged.length == 0 ) callback(null, 0);
	else {
	    conn.query("BEGIN;");
	    for (var i = 0; i++; i < logged.length) {
		
	    }
	}
    },

    process_departures: function(location, logged, callback) {
	if ( logged.length == 0 ) {
	    conn.query("UPDATE sl_Register.attendence SET departure = NOW() WHERE location = ( SELECT id FROM sl_Register.location WHERE name = ? )", [ location, logged[0] ], function(err, rows, fields) {
		if (err) console.log("ERROR (1): " + err);
		if (err) return callback(err);
		console.log(rows);
		callback(null);
	    });	    
	}
	else if ( logged.length == 1 ) {
	    conn.query("UPDATE sl_Register.attendence SET departure = NOW() WHERE location = ( SELECT id FROM sl_Register.location WHERE name = ? ) AND name NOT IN ( ? )", [ location, logged[0] ], function(err, rows, fields) {
		if (err) console.log("ERROR (1): " + err);
		if (err) return callback(err);
		console.log(rows);
		callback(null);
	    });
	}
	else {
	    conn.query("UPDATE sl_Register.attendence SET departure = NOW() WHERE location = ( SELECT id FROM sl_Register.location WHERE name = ? ) AND name NOT IN ( ? )", [ location, logged ], function(err, rows, fields) {
		if (err) console.log("ERROR (n): " + err);
		if (err) return callback(err);
		console.log(rows);
		callback(null);
	    });
	}
    },

    disconnect: function() {
	conn.disconnect();
    }
};


