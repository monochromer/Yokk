'use strict'

var upload = require('./file_upload');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;

exports = module.exports = function(app) {

/****************************PASSPORT****************************/

	passport.use(new Strategy(
	    function(username, password, cb) {
	        var User = app.db.models.User;
			// !!! not all the fields should be returned – check and refactor
	        User.userAuthorize(username, function(err, user){
	          if (err) { return cb(err); }
	          if (!user) {
	              console.log('User ' + username + ' not found in DB');
	              return cb(null, false);
	          };
				if (user.checkPassword(password)) {
					return cb(null, user);
				} else {
					console.log('Wrong password');
					return cb(null, false);
				}
	        });
	    }
	));

	passport.serializeUser(function(user, cb) {
		cb(null, user.id);
	});

	// !!! not all the fields should be returned – check and refactor
	passport.deserializeUser(function(id, cb) {
		var User = app.db.models.User;
		User.findOne( { _id: id }, function(err, user) {
			if (err) { return cb(err); }
			cb(null, user);
		} );
	});

	app.use(passport.initialize());
	app.use(passport.session());

/*********************************************************************/

	app.get('/', require('connect-ensure-login').ensureLoggedIn(), function(req, res) {
		res.sendFile(__dirname + '/views/index.html');
	});

	app.get('/login',
	  function(req, res){
		  res.sendFile(__dirname + '/views/login.html');
	  });

	app.post('/login',
	  passport.authenticate('local', { failureRedirect: '/login' }),
	  function(req, res) {
	    res.redirect('/');
	  });

	  app.get('/logout',
  	  function(req, res){
  	    req.logout();
  	    res.redirect('/');
  	  });

	app.get('/user', require('connect-ensure-login').ensureLoggedIn(), function(req, res) {
		var User = req.app.db.models.User;
		User.allUsers(function(err, user){
			// returned fields can be adjusted in User schema
			res.send(user);
		});
	});

	/***************** CRUD for User ************************/

	app.post('/users/add', function(req, res) {

		console.log("new add response " + req.body);
		var User = req.app.db.models.User;
		var user = new User(req.body);

		user.save(function (err, user) {
			if (err) return console.error(err);
			res.status(200).send(user);
		});

	});

	app.get('/user/:user_login',require('connect-ensure-login').ensureLoggedIn(), function(req, res) {
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
		User.editUser(login, update, function(err, user) {
			if (err) res.send(err);
			res.status(200).send(user);
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

	/************** ending CRUD for user *********************/

	app.post('/upload_profile_picture/users/:user_login', function(req, res) {
		var User = req.app.db.models.User;
		var login = req.params.user_login;
		var update = {profileImg: '/users/'+login+'.jpg'};
		User.editUser(login, update, function(err, user){
			if (err)
				res.send(err);
			if (user) {
				console.log('User '+login+' updated:');
				console.log(update);
				upload( req, res );
				res.json({ message: 'User updated!' });
			} else {
				res.json({ message: 'User '+ login + ' is not found in DB' });
			}
		});
	});


}
