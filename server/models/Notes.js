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
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Completed'],
      required: true,
      default: 'Pending',
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {timestamps: true},
);

module.exports = mongoose.model('Notes', NotesSchema);
