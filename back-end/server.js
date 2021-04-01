const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));
// parse application/json
app.use(bodyParser.json());
app.use(cookieParser);
app.use(cookieSession({
  name: 'session',
  key: ['secretValue'],
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 24 hours in ms
  }
}))

// connect to the database
mongoose.connect('mongodb://localhost:27017/todo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const users = require('./routes/users');
const students = require('./routes/students');
app.use('/api/users', users.routes);
app.use('/api/students', students.routes);

app.listen(3001, () => console.log("Server is listening on port 3001!"))