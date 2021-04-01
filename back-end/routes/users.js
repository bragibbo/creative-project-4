const mongoose = require('mongoose');
const express = require('express');
const argon2 = require('argon2');
const { default: router } = require('../../front-end/src/router');

// User database collection model
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    role: {
        type: String,
        default: "student"
    },
    email: String,
    gender: String,
})

// Method to compare the password to the db password
userSchema.methods.comparePassword = async function(password) {
  try {
    const isMatch = await argon2.verify(this.password, password)
    return isMatch
  } catch (error) {
    return false;
  }
}

// Remove password from the response body
userSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
}

// Hash the password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password'))
    return next();

  try {
    const hash = await argon2.hash(this.password);
    this.password = hash;
    next();
  } catch (error) {
    next(error)
  }
})

// Set _id to be identifiable id 
userSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });

// Use the virtuals when converting the model to Json
userSchema.set('toJSON', {
	virtuals: true
});

const User = mongoose.model("User", userSchema);

// Verify that the user is logged in properly
const validateUser = async (req, res, next) => {
  if (!req.session.userID)
    return res.status(403).send({
      message: "not logged in"
    });

  try {
    const user = await User.findOne({
      id: req.session.userID
    });
    if (!user) {
      return res.status(403).send({
        message: "not logged in"
      });
    }
    
    req.user = user
  } catch {
    return res.status(403).send({
      message: "not logged in"
    });
  }
}

// User Registration
router.post('/register', async (req, res) => {
  if(!req.body.username || !req.body.password) 
    return res.status(400).send({ message: 'username and password are required' });

  try {
    const existingUser = await User.findOne({
      username: req.body.username
    })
    if (existingUser) return res.status(403).send({ message: 'username already exists' });

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      gender: req.body.gender
    });

    await user.save();
    req.session.userId = user._id;
    return res.send({ user: user });

  } catch (error) {
    return res.sendStatus(500)
  }

});

// User login
router.post('/login', async (req, res) => {
  if(!req.body.username || !req.body.password) return res.sendStatus(400);

  try {
    const user = User.findOne({ username: req.body.username });
    if (!user || !await user.comparePassword(req.body.password)) {
      return res.status(403).send({ message: 'username or password is wrong' });
    }

    req.session.userID = (await user)._id;
    return res.send({ user: user });

  } catch (err) {
    return res.sendStatus(500);
  }
});

// Get user information
router.get('/', validateUser, async (req, res) => {
  try {
    res.send({
      user: req.user
    });
  } catch (error) {
    return res.sendStatus(500);
  }
});

// Log user out
router.delete('/', validateUser, async (req, res) => {
  try {
    req.session = null;
    res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
});

module.exports = {
  routes: router,
  model: User,
  valid: validateUser
}