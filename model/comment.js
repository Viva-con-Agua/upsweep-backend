//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var Comment = new Schema({
  text:{type : String , required : true},
  parentPoolEventId : String,
  createdAt :{
      type : Date,
      default : Date.now
  } 
});


var Comment = mongoose.model('Comment', Comment );

module.exports = Comment ;
