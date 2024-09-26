// Import required modules
const router = require('express').Router();
const User = require('../models/User'); // Ensure the path to the model is correct

// Login Route
router.post('/login', async (req, res) => {
  try {
    // Find user by email
    const user = await User.findOne({
      email: req.body.email,
    });
    // If user not found, respond with error
    if (!user) {
      return res
        .status(401)
        .json({message: 'Invalid email or password', status: false});
    }

    // Validate the password
    const validatePassword = req.body.password === user.password;
    // If password is incorrect, respond with error
    if (!validatePassword) {
      return res.status(401).json({message: 'Invalid email or password'});
    }

    // Respond with user data (excluding password)
    res.status(200).json({id: user.id, name: user.name, email: user.email}); // Exclude password for security
  } catch (error) {
    res.status(500).json(error);
  }
});

// Register Route
router.post('/register', async (req, res) => {
  try {
    // Create a new user instance with provided data
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    // Save the user to the database
    const data = await user.save();
    // Respond with user data
    res.status(200).json(data);
  } catch (error) {
    // Handle potential errors, such as email already in use
    res.status(500).json(error);
  }
});

// Export the router
module.exports = router;
