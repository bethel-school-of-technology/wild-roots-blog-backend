//require mongoose
var mongoose = require('mongoose');
const { Schema } = mongoose;

// Define schema
// var Cooking = mongoose.Schema;

var newRecipie = new Schema({
    firstName: String,
    email: String,
    recipieName: String,
    description: String
  }
);

// Compile model from schema
var CookingModel = mongoose.model('Recipies', newRecipie );

module.exports = CookingModel;