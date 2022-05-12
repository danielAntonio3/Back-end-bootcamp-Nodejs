const { mongoose } = require('../config/db');
const { Schema } = require('mongoose');

const CategorySchema = new Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    lowercase: true,
  },
  job: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Jobs',
    },
  ],
  createIn: {
    type: Date,
    default: Date.now,
  },
});

const CategoryModel = mongoose.model('Categories', CategorySchema);

module.exports = CategoryModel;
