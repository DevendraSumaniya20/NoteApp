const mongoose = require('mongoose');

const NotesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minlength: 5,
      maxlength: 50,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      minlength: 20,
      maxlength: 300,
      required: true,
      trim: true,
    },
    postedBy: {
      type: String,
      minlength: 5,
      maxlength: 50,
      required: true,
    },
  },
  {timestamps: true},
);

module.exports = mongoose.model('Notes', NotesSchema);
