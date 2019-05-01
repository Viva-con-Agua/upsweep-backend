//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var voteSchema = new Schema({
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    _creator: { type: Schema.ObjectId, ref: 'User', required: true },
    _comment: { type: Schema.ObjectId, ref: 'Comment' }
});

var Vote = mongoose.model('Vote', voteSchema);
module.exports = Vote;
