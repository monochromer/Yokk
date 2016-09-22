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

	app.get('/user', function(req, res) {
		var User = req.app.db.models.User;
		User.allUsers(function(err, user){
			// returned fields can be adjusted in User schema
			res.send(users);
		})
	});

	app.get('/user/:user_login', function(req, res) {
		var User = req.app.db.models.User;
		// returned fields can be adjusted in User schema
		User.findByLogin(req.params.user_login, function(err, user){
			res.send(user)
		})

	});

}
