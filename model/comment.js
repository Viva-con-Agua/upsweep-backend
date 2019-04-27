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

var Comment = new Schema({
  text: {type : String , required : true},
  reply : {type : [reply]},
  createdAt :{
      type : Date,
      default : Date.now
  } 
});


var Comment = mongoose.model('Comment', Comment );

module.exports = Comment;
