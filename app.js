// Importing Modules
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Configuring Express
const staticPath = path.join(__dirname, 'public');
app.use(express.static(staticPath));

// Set the View Engine(Templating Engine)
app.set('view engine', 'ejs');

// connect to mongodb & listen for requests
const mongoUserName = process.env.MONGO_USER_NAME;
const mongoClusterPassword = process.env.MONGO_CLUSTER_PASSWORD;
const dbURI = `mongodb+srv://${mongoUserName}:${mongoClusterPassword}@cluster0.8wlqu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// Once the server connects with the Database, listen to localhost:PORT
const port = process.env.PORT;
const host = process.env.HOST;

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) =>
    app.listen(port, host, () => {
      console.log(`Server is listening on ${host}:${port}`);
    })
  )
  .catch((err) => console.log(err));

// Create and setup the routes
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Home',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Us',
  });
});

app.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact Us',
  });
});

app.get('/signin', (req, res) => {
  res.render('signin', {
    title: 'Sign In',
  });
});

app.get('/signup', (req, res) => {
  res.render('signup', {
    title: 'Sign Up',
  });
});
