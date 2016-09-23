'use strict'

// var multer  = require('multer');

var upload = require('./file_upload');

exports = module.exports = function(app) {

	app.get('/', function(req, res) {
	    res.sendFile(__dirname + '/views/index.html');
	});

	app.get('/user', function(req, res) {
		var User = req.app.db.models.User;
		User.allUsers(function(err, user){
			// returned fields can be adjusted in User schema
			res.send(user);
		});
	});

	/***************** CRUD for user block *****************/

	app.post('/users/add', function(req, res) {

		console.log("new add response " + req.body);
		var User = req.app.db.models.User;
		var user = new User(req.body);

		user.save(function (err, user) {
			if (err) return console.error(err);
			res.status(200).send(user);
		});

	});

	app.get('/user/:user_login', function(req, res) {
		var User = req.app.db.models.User;
		var login = req.params.user_login;
		// returned fields can be adjusted in User schema
		User.findByLogin(login, function(err, user){
			res.send(user)
		});
	});

	app.put('/user/:user_login', function(req, res) {
		var User = req.app.db.models.User;
		var login = req.params.user_login;
		var update = req.body;

		User.editUser(login, update, function(err, user){
			if (err)
				res.send(err);

			console.log('User '+login+' updated:');
			console.log(update);
			res.json({ message: 'User updated!' });
		});
	});

	app.delete('/user/:user_login', function(req, res) {
		var User = req.app.db.models.User;
		var login = req.params.user_login;
		console.log(login);

		User.deleteUser(login, function (err) {
			if (err) return handleError(err);
			res.send('User '+login+' succesfully removed from DB');
		});
	});

	/************** ending CRUD for user block **************/

	app.post('/upload_profile_picture/users/:user_login', function(req, res) {
		upload( req, res );
	});


}
