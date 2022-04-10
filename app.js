// Importing Modules
const path = require('path');

// Importing Express
const express = require('express');
const app = express();

// Configuring Express
const staticPath = path.join(__dirname, 'public');
app.use(express.static(staticPath));

// Set the View Engine
app.set('view engine', 'ejs');

// Create and setup the routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/signin', (req, res) => {
  res.render('signin');
});

// Listen to localhost:PORT
app.listen('8000', () => {
  console.log('Listening on Port 8000');
});
