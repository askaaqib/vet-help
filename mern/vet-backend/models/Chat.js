const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
	problem: {
		type: String
	},
	problem_duration: {
		type: String
	},
	eating: {
		type: String
	},
	weight: {
		type: String
	},
	images: {
		type: Array
	},
	videos: {
		type: Array
	},
  _pet: {
    type: Schema.Types.ObjectId,
    ref: 'pet'
  }
});

const Chat = mongoose.model('chat', ChatSchema );

module.exports = Chat;