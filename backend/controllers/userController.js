const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Helper function to create the VIP Pass (Token)
const createToken = (_id) => {
  // Signs the token with your secret key and makes it expire in 3 days
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// 1. LOGIN USER
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) throw Error('All fields must be filled');
    
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) throw Error('Incorrect email');

    // Check if the password matches the scrambled one in the database
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw Error('Incorrect password');

    // Create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 2. SIGNUP USER
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) throw Error('All fields must be filled');
    
    // Check if email is already taken
    const exists = await User.findOne({ email });
    if (exists) throw Error('Email already in use');

    // Scramble (hash) the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Save the user to the database with the hashed password
    const user = await User.create({ email, password: hash });

    // Create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };