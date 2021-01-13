var mongoose = require('mongoose');
const { Schema } = mongoose;

// Define schema
var ContactUs = mongoose.Schema;

var Customer = new Schema({
  customer: {
    name: String,
    email: String,
    message: String
  }
  
});

// Compile model from schema
var ContactUsModel = mongoose.model('ContactUs', Customer);

module.exports = ContactUsModel;