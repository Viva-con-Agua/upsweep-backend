//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var reply = new Schema({
  text:{type : String , required : true},
  createdAt :{
      type : Date,
      default : Date.now
  } 
});


var replies = mongoose.model('reply', reply );

module.exports = replies;
