const express = require('express');
const { loginUser, signupUser } = require('../controllers/userController');

const router = express.Router();

// POST route to login
router.post('/login', loginUser);

// POST route to signup
router.post('/signup', signupUser);

module.exports = router;