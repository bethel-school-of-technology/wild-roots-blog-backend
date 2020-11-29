// Require Mongoose
var mongoose = require('mongoose');
const { Schema } = mongoose;

// Define schema
var Customer = mongoose.Schema;

var Customer = new Schema({
  customer: {
    firstName: String,
    lastName: String,
    email: String
  },
  product: {
    name: String,
    store: String,
    price: Number
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
var CustomerModel = mongoose.model('Customer', Customer );

module.exports = CustomerModel;