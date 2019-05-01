//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var replySchema = new Schema({
    text : { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    _creator: { type: Schema.ObjectId, ref: 'User', required: true },
    _comment: { type: Schema.ObjectId, ref: 'Comment' , required:true},
    _votes : [{type: Schema.ObjectId, ref : 'Vote'}]
});

let Reply = mongoose.model('Reply', replySchema);
module.exports = Reply;
