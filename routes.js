'use strict'
var exec = require('exec');
var upload = require('./file_upload');

exports = module.exports = function(app, passport) {

	app.post('/api/deploy/', function(req, res) {
		exec('sh ./build.sh', function() { res.status(200).send("Deployed!") });
	});

	app.get('/', require('connect-ensure-login').ensureLoggedIn(), function(req, res) {
		res.sendFile(__dirname + '/views/index.html');
	});

	app.get('/login', function(req, res){
		res.sendFile(__dirname + '/views/login.html');
	});

	app.post('/login', passport.authenticate('local', {failureRedirect: '/login' }), function(req, res) {
		res.redirect('/');
	});

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});

	app.get('/api/user', require('connect-ensure-login').ensureLoggedIn(), function(req, res) {
		var User = req.app.db.models.User;
		User.allUsers(function(err, user) {
			// returned fields can be adjusted in User schema
			res.send(user);
		});
	});

	/***************** CRUD for User ************************/

	app.post('/api/users/add', require('connect-ensure-login').ensureLoggedIn(), function(req, res) {

		console.log("new add response " + req.body);
		var User = req.app.db.models.User;
		var user = new User(req.body);

		user.save(function (err, user) {
			if (err) return console.error(err);
			res.status(200).send(user);
		});

	});

	app.get('/api/user/:user_login',require('connect-ensure-login').ensureLoggedIn(), function(req, res) {
		var User = req.app.db.models.User;
		var login = req.params.user_login;
		// returned fields can be adjusted in User schema
		User.findByLogin(login, function(err, user){
			res.send(user)
		});
	});

	app.get('/api/check_permissions', function(req, res) {
		// as of now, returned field adjusted in userpassport.js
		console.log(req.user);
	});

	app.put('/api/user/:user_login', require('connect-ensure-login').ensureLoggedIn(), function(req, res) {
		var User = req.app.db.models.User;
		var login = req.params.user_login;
		var update = req.body;
		User.editUser(login, update, function(err, user) {
			if (err) res.send(err);
			res.status(200).send(user);
		});
	});

	app.delete('/api/user/:user_login', require('connect-ensure-login').ensureLoggedIn(), function(req, res) {
		var User = req.app.db.models.User;
		var login = req.params.user_login;

		User.deleteUser(login, function (err) {
			if (err) return handleError(err);
			res.status(200).send(login);
		});
	});

	/************** ending CRUD for user *********************/

	app.post('/api/upload_profile_picture/users/:user_login', function(req, res) {
		var User = req.app.db.models.User;
		var login = req.params.user_login;
		var update = { profileImg: '/users/'+login+'.jpg' };
		User.editUser(login, update, function(err, user){
			if (err)
				res.send(err);
			if (user) {
				upload( req, res );
				res.status(200).send(user);
			} else {
				res.status(404).send({ message: 'User ' + login + ' is not found in DB' });
			}
		});
	});

	app.get('*', require('connect-ensure-login').ensureLoggedIn(), function(req, res) {
		res.redirect('/');
	});



}
