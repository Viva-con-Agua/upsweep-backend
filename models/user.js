//Require Mongoose
var mongoose = require('mongoose');


//Define a schema
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  userName : {type: String , required:true},
  isDeleted : {type:Boolean , default : false},
  createdAt  : {type: Date , default : Date.now}
});

var User = mongoose.model('User', UserSchema );
module.exports = User;
