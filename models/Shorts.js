const { Schema, model} = require('mongoose');
const shortId = require('shortid');

const ShortsSchema = new Schema({
	full: {
		type: String,
		required: true
	},
	short: {
		type: String,
		required: true,
		default: shortId.generate
	},
	clicks: {
		type: Number,
		required: true,
		default: 0
	}
});

module.exports = model('Shorts', ShortsSchema);
