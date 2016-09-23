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

		fullname: String,
		position: String,
		email:    String,
		phone:    String,
		skype:    String,
		workours: String,
	    birthday: String,
	    vk:       String,
	    twitter:  String,
	    facebook: String,
	    linkedin: String,
	    aboutme:  String,
	    cv:       String
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
			 login: 1
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

	userSchema.statics.editUser = function(login, updateObject, cb) {
		return this.findOneAndUpdate({login: login}, updateObject, cb);
	};

	userSchema.statics.deleteUser = function(login, cb) {
		return this.remove({login: login}, cb);
	};

	app.db.model('User', userSchema);
}
