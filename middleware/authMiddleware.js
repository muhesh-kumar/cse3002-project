const jwt = require('jsonwebtoken');
const User = require('../models/User');

// protect routes using this middleware (basically add this middleware as a handler to those routes which need protection i.e., authentication)
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists and is verified
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/signin');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/signin');
  }
};

// check current user (to validate any request sent to the server - check if the request is actually sent by an existing user or not)
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        // console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        // console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser };
