// Require Mongoose
var mongoose = require('mongoose');
const { Schema } = mongoose;

// Define schema
var Blog = mongoose.Schema;

var Blog = new Schema({
    userName: String,
    caption: String,
    description: String,
    imageUrl: String
});

// Compile model from schema
var BlogModel = mongoose.model('Blog', Blog );

module.exports = BlogModel;