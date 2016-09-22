'use strict'

exports = module.exports = function(app) {

	app.get('/', function(req, res) {
	    res.sendFile(__dirname + '/views/index.html');
	});

	app.post('/new_user', function(req, res) {

		var User = req.app.db.models.User;
	    var user = new User(req.body);

        user.save(function (err, user) {
            if (err) return console.error(err);
			console.log('Created new user: '+user);
            res.send('Created new user: '+user.name+' '+user.surname+' is saved to DB');
        });
	});

	app.get('/all_users', function(req, res) {
		console.log('test request done:');
		console.log(req.body);

		var User = req.app.db.models.User;
		var user = new User();
		user.save(function (err, user) {
			if (err) return console.error(err);
			console.log('Created new user: '+user);
			res.send('Created new user: '+user.name+' '+user.surname+' is saved to DB');
		});
	});

}
