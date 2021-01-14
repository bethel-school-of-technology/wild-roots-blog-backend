var mongoose = require('mongoose');
const { Schema } = mongoose;


// Define schema
var User = mongoose.Schema;

var User = new Schema({
  user: {
    username: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, unique: true, minLength: 5 },
    passwordCheck: String
  }}, 
  
  {timestamps: true});

var UserModel = mongoose.model('Users', User );

module.exports = UserModel;

