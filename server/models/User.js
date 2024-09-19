const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 4,
      maxlength: 30,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      minlength: 5,
      maxlength: 50,
      unique: true,
      required: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, 'Invalid email address'],
    },
    password: {
      type: String,
      minlength: 5,
      maxlength: 30,
      required: true,
      trim: true,
    },
  },
  {timestamps: true},
);

module.exports = mongoose.model('User', UserSchema);
