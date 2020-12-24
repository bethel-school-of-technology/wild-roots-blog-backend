//require mongoose
var mongoose = require('mongoose');
const { Schema } = mongoose;


// define Schema


var Community = mongoose.Schema;

var Community = new Schema({
    firstname: String,
    lastname: String,
    caption: String,
    description: String,
    imageUrl: String
});

// Compile model from schema
var CommunityModel = mongoose.model('community', Community );

module.exports = CommunityModel;
