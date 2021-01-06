var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const { Schema } = mongoose;
var crypto = require('crypto');

// Define schema
var Schema = mongoose.Schema;

var User = new Schema({
  newUser: {
    username: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
    email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    password: String
  }}, 
  
  {timestamps: true});

  UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});





// Compile model from schema
var UserModel = mongoose.model('User', User );

module.exports = UserModel;