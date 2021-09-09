const { Schema, model} = require('mongoose');
const shortId = require('shortid');

const ShortsSchema = new Schema({
  full: {
    type: String,
    required: true,
    unique: true,
  },
  short: {
    type: String,
    required: true,
    default: shortId.generate,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('Shorts', ShortsSchema);
