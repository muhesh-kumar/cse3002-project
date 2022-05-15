const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Appointment = require('../models/Appointment');

// protect routes using this middleware (basically add this middleware as a handler to those routes which need protection i.e., authentication)
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token);

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
const checkDoctor = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        const isDoctor = !user.isPatient;
        if (!isDoctor) {
          res.locals.user = null;
          res.redirect('/signin');
          console.log('Only Doctors can view this route');
        }
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

const checkPatient = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        if (!user.isPatient) {
          res.locals.user = null;
          res.redirect('/signin');
          console.log('Only Patients can view this route');
        }
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkDoctor, checkPatient };
