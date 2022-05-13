const { mongoose } = require('../config/db');
const { Schema } = require('mongoose');

const JobsSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
  },
  companyName: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
  },
  publishedBy: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
  },
  typeDay: {
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
  city: {
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
  job: {
    type: String,
    required: true,
    lowercase: true,
    enum: ['face to face', 'remote', 'Hybrid']
  },
  levenExperience: {
    type: String,
    required: true,
    lowercase: true,
    enum: ['practices', 'director', 'without experience', 'intermediate', 'executive']
  },
  applicants: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Users',
    }
  ],
  createIn: {
    type: Date,
    default: Date.now,
  },
});

const JobModel = mongoose.model('Jobs', JobsSchema);

module.exports = JobModel;
