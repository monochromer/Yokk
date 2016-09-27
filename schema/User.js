'use strict'

var crypto = require('crypto');

exports = module.exports = function(app, mongoose) {
	var userSchema = new mongoose.Schema({
		login: {
			type: String,
			uniq: true,
			required: true
		},
	    hashedPassword: {
	    	type: String,
	   		required: true
	    },
	    salt: {
	    	type: String,
	    	required: true
	    },

		fullname:   String,
		position:   String,
		email:      String,
		phone:      String,
		skype:      String,
		workours:   String,
	    birthday:   String,
	    vk:         String,
	    twitter:    String,
	    facebook:   String,
	    linkedin:   String,
	    aboutme:    String,
	    cv:         String,
		profileImg: String,
		joinedteam: { type: Date, default: null },
		role: { type: String, default: 'user' }
	});

	userSchema.methods.encryptPassword = function(password) {
	    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
	};

	userSchema.virtual('password')
	.set(function(password) {
		this._plainPassword = password;
		this.salt = Math.random() + '';
		this.hashedPassword = this.encryptPassword(password);
	})
	.get(function() { return this._plainPassword; });

	userSchema.methods.checkPassword = function(password) {
		return this.encryptPassword(password) === this.hashedPassword;
	};

	userSchema.statics.allUsers = function(cb) {
		var fieldsToReturn = {
			_id: 1,
			login: 1,
			fullname: 1,
			position: 1,
			email: 1,
			phone: 1,
			skype: 1,
			workhours: 1,
			birthday: 1,
			vk: 1,
			twitter: 1,
			facebook: 1,
			linkedin: 1,
			aboutme: 1,
			cv: 1,
			profileImg: 1
		 }
		return this.find({}, fieldsToReturn, cb);
	};

	userSchema.statics.findByLogin = function(login, cb) {
		var fieldsToReturn = {
			_id: 1,
			 login: 1
		 }
		return this.findOne( { login: login }, fieldsToReturn, cb );
	};

	userSchema.statics.userAuthorize = function(login, cb) {
		var fieldsToReturn = {
			_id: 1,
			 login: 1,
			 hashedPassword: 1,
			 salt: 1,
			 admin: 1
		 };
		return this.findOne( { login: login }, fieldsToReturn, cb );

	};

	userSchema.statics.checkPassword = function(password) {
		return this.encryptPassword(password) === this.hashedPassword;
	};

	userSchema.statics.editUser = function(login, updateObject, cb) {
		return this.findOneAndUpdate({ login: login }, updateObject, { new: true }, cb);
	};

	userSchema.statics.deleteUser = function(login, cb) {
		return this.remove({login: login}, cb);
	};

	app.db.model('User', userSchema);
}
