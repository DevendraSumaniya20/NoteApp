const router = require('express').Router();
const User = require('../models/User'); // Ensure the path to the model is correct

// Login Route
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    !user &&
      res
        .status(401)
        .json({message: 'Invalid email or password', status: false});

    const validatePassword = req.body.password == user.password;
    !validatePassword &&
      res.status(401).json({message: 'Invalid email or password'});

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Register Route
router.post('/register', async (req, res) => {
  // res.send('User registration is successful!');

  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    const data = await user.save();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
