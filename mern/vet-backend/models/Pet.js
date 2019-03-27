const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PetSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	type: {
		type: String,
		required: true
	},
	breed: {
		type: String,
		required: true
	},
	age: {
		type: String
	},
	image: {
		type: String
	}
});

const Pet = mongoose.model('pet', PetSchema );

module.exports = Pet;