'use strict'

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
		workours: String
	    team:     String,
	    birthday: String,
	    vk:       String,
	    twitter:  String,
	    facebook: String,
	    linkedin: String,
	    aboutme:  String,
	    cv:       String
	})
}