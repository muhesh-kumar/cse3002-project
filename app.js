// Modules
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
// const io = require('socket.io')(http);

// Routes
const staticRoutes = require('./routes/staticRoutes');
const authRoutes = require('./routes/authRoutes');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
require('dotenv').config();

app.set('view engine', 'ejs');

const dbURI = process.env.DB_URI;
const port = process.env.PORT;
const host = process.env.HOST;

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) =>
    app.listen(port, host, () => {
      console.log(`Server is listening on ${host}:${port}`);
    })
  )
  .catch((err) => console.log(err));

// app.get('*', checkUser);
// app.post('*', checkUser);
app.use(staticRoutes);
app.use(authRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
