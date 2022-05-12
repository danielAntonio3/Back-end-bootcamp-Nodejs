const { mongoose } = require('../config/db');
const { Schema } = require('mongoose');

const JobsSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
  },
  country: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
  },
  category: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Categories',
    },
  ],
  description: {
    type: String,
    required: true,
  },
  createIn: {
    type: Date,
    default: Date.now,
  },
});

const JobModel = mongoose.model('Jobs', JobsSchema);

module.exports = JobModel;
