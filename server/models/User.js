const mongoose = require('mongoose');
const {v4: uuidv4} = require('uuid'); // Import uuid

// Define the User schema
const UserSchema = new mongoose.Schema(
  {
    // Auto-generated ID for the user
    id: {
      type: String,
      default: uuidv4, // Automatically generate a new UUID for each user
      unique: true,
    },
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
  {timestamps: true}, // Automatically add createdAt and updatedAt fields
);

// Export the User model
module.exports = mongoose.model('User', UserSchema);
