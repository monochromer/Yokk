'use strict'
var exec = require('exec');
var upload = require('./file_upload');
var log = require('./logger');

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
		var logMsq = 'User (login: '+req.user.login+') is authorized and redirected to /';
		log(req, logMsq).info();
		res.redirect('/');
	});

	app.get('/logout', function(req, res){
		var logMsq = 'User (login: '+req.user.login+') is logged out';
		log(req, logMsq).info();
		req.logout();
		res.redirect('/');
	});

	app.get('/api/user', require('connect-ensure-login').ensureLoggedIn(), function(req, res) {
		var userModel = req.app.db.models.User;
		userModel.allUsers(function(err, user) {
			// returned fields can be adjusted in User schema
			if (err) {
				var logMsq = 'There was some error while saving data to db';
				log(req, logMsq).err();
				res.send('Error. Look server logs.');
			}
			res.send(user);
		});
	});

	/***************** CRUD for User ************************/

	app.post('/api/users/add', require('connect-ensure-login').ensureLoggedIn(), function(req, res) {

		var userModel = req.app.db.models.User;
		var user = new userModel(req.body);

		user.save(function (err, user) {
			if (err) return log(req, err).err();
			var logMsq = 'User (login: ' + user.login + ') is saved to DB';
			log(req, logMsq).info()
			res.status(200).send(user);
		});

	});

	app.get('/api/user/:user_login',require('connect-ensure-login').ensureLoggedIn(), function(req, res) {
		var userModel = req.app.db.models.User;
		var login = req.params.user_login;
		// returned fields can be adjusted in User schema
		userModel.findByLogin(login, function(err, user){
			if (err) return log(req, err).err();
			log(req).info()
			res.send(user)
		});
	});

	app.get('/api/check_permissions', function(req, res) {
		// as of now, returned field adjusted in userpassport.js
		res.send(req.user);
	});

	app.put('/api/user/:user_login', require('connect-ensure-login').ensureLoggedIn(), function(req, res) {
		var userModel = req.app.db.models.User;
		var login = req.params.user_login;
		var update = req.body;
		userModel.editUser(login, update, function(err, user) {
			if (err) {
				var logMsq = 'There was some error while updating user data';
				log(req, logMsq).err();
				return res.send('Error. Look server logs.');
			}
			var logMsq = 'User (login: ' + user.login + ') is updated';
			log(req, logMsq).info()
			res.status(200).send(user);
		});
	});

	app.delete('/api/user/:user_login', require('connect-ensure-login').ensureLoggedIn(), function(req, res) {
		var userModel = req.app.db.models.User;
		var login = req.params.user_login;

		userModel.deleteUser(login, function (err) {
			if (err) {
				return log(req, err).err();
			};
			var logMsq = 'User ' + login + ' succesfully deleted';
			log(req, logMsq).info()
			res.status(200).send(login);
		});
	});

	/************** ending CRUD for user *********************/

	app.post('/api/upload_profile_picture/users/:user_login', function(req, res) {
		var userModel = req.app.db.models.User;
		var login = req.params.user_login;
		var update = { profileImg: '/users/'+login+'.jpg' };
		userModel.editUser(login, update, function(err, user){
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
		var logMsq = 'Not found';
		log(req, logMsq).info()
		res.redirect('/');
	});



}
