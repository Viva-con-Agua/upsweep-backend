var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Comment = new Schema({
  text: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now
  },
  _creator: {
    id: { type: String, required: true },
    fullName: { type: String, required: false , default : 'anonymous' }
  },
  _poolEvent: { type: Schema.ObjectId, ref: 'PoolEvent', required: true },
  _replies: [{ type: Schema.ObjectId, ref: 'Reply' }],
  _votes: [{ type: Schema.ObjectId, ref: 'Vote' }]
});

var Comment = mongoose.model('Comment', Comment);

module.exports = Comment;
