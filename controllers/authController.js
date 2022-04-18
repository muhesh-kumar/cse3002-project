const User = require('../models/User');

const jwt = require('jsonwebtoken');

// Mongoose Hooks is a special function which fires when a mongoose event happens

// Handle errors
const handleErrors = (err) => {
  console.log('Inside Handle Errors method: ', err.message, err.code);
  let errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    console.log('here email');
    errors.email = 'that mail is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    console.log('here password');
    errors.password = 'that password is incorrect';
  }

  // duplicate error code
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation erros
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
      // console.log(properties);
    });
  }

  return errors;
};

// crate json web token
const maxAge = 3 * 24 * 60 * 60; // (3days in seconds)
const createToken = (id) => {
  return jwt.sign({ id }, 'my secret', {
    expiresIn: maxAge,
  });
};

// controller actions
const signup_get = (req, res) => {
  res.render('signup', {
    title: 'Sign Up',
  });
};

const signin_get = (req, res) => {
  res.render('signin', {
    title: 'Sign In',
  });
};

// TODO: the below 3 controllers
const signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 1000 * maxAge,
    });

    // res.status(201).json(user);
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).send({ errors });
  }
};

const signin_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 1000 * maxAge,
    });

    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }

  // console.log(email, password);
  // res.send('user login');
};

const signout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
};

module.exports = {
  signup_get,
  signin_get,
  signup_post,
  signin_post,
  signout_get,
};
