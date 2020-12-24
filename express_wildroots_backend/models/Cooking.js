//require mongoose
var mongoose = require('mongoose');
const { Schema } = mongoose;

// Define schema
var Cooking = mongoose.Schema;

var Cooking = new Schema({
   guest: {
    firstName: String,
    lastName: String,
    recipieName: String,
    description: String
  },
  address: {
    mailingOne: String, 
    mailingTwo: String,
    city: String,
    state: String,
    zip: Number
  }
});

// Compile model from schema
var CookingModel = mongoose.model('Cooking', Cooking );

module.exports = CookingModel;