const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const staticRoutes = require('./routes/staticRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Configuring Express
const staticPath = path.join(__dirname, 'public');
app.use(express.static(staticPath));

// Set the View Engine(Templating Engine)
app.set('view engine', 'ejs');

require('dotenv').config();

// connect to mongodb & listen for requests
const dbURI = process.env.DB_URI;

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

app.use(staticRoutes);

// TODO: edit authcontroller files
app.use(authRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
