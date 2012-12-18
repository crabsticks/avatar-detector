var avi = require("./lib/Avatar");


avi.is_in_attendence("test", "crabsticks Resident", function() {

});
/*
avi.current("test", function(err, avatars) {
    if (err) return console.log("error: " + err);
    console.log(avatars);
    avatars.shift();
    avi.process_departures("test", avatars, function(err) {
	if (err) throw err;
	avi.current("test", function(err, avatars) {
	    if (err) throw err;
	    console.log(avatars);
	});
    });
});
*/