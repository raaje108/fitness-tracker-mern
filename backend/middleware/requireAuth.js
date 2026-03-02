const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {
  // Grab the authorization header from the incoming request
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  // The token looks like "Bearer eyJhbGciOi...", so we split it to just get the token part
  const token = authorization.split(' ')[1];

  try {
    // Verify the token using our secret key
    const { _id } = jwt.verify(token, process.env.SECRET);

    // Attach the user's ID to the request so the controller knows exactly who is logged in
    req.user = await User.findOne({ _id }).select('_id');
    
    // Move on to the next piece of code (the controller)
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Request is not authorized' });
  }
};

module.exports = requireAuth;