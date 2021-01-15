// Require Mongoose
var mongoose = require('mongoose');
const { Schema } = mongoose;

// Define schema

var scriptureSchema = new Schema({
  reference: String,
  verse: String

});

// Compile model from schema
var Scripture = mongoose.model('Scripture', scriptureSchema );

module.exports = Scripture;
