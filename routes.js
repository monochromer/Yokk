'use strict'

exports = module.exports = function(app) {

	app.get('/', function(req, res) {
	    res.sendFile(__dirname + '/views/index.html');
	});

	app.post('/users/add', function(req, res) {

		console.log("new add response " + req.body);
		var User = req.app.db.models.User;
	    var user = new User(req.body);

        user.save(function (err, user) {
            if (err) return console.error(err);
            res.status(200).send(user);
        });

	});

	app.get('/all_users', function(req, res) {
		var User = req.app.db.models.User;
		var fieldsToReturn = {
			_id: 0,
			 login: 1
		 }
		User.aggregate(	{$project: fieldsToReturn } )
			.exec(function (err, users) {
			// return users as an array of user objects
				res.send(users);
		});
	});

}
