//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var PoolEventSchema = new Schema({
    title: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    _creator: { type: Schema.ObjectId, ref: 'User', required: true },
    _comments: [{ type: Schema.ObjectId, ref: 'Comment' }]
});

var PoolEvent = mongoose.model('PoolEvent', PoolEventSchema);
module.exports = PoolEvent;
