var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const { Schema } = mongoose;
var crypto = require('crypto');

// Define schema
var Schema = mongoose.Schema;

var User = new Schema({
  user: {
    username: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, unique: true, minLength: 5 },
    passwordCheck: String
  }}, 
  
  {timestamps: true});

  UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});





// Compile model from schema
var UserModel = mongoose.model('User', User );

module.exports = UserModel;