const express = require('express');
const mongoose = require('mongoose');
const Users = require('./users').model;
const validateUser = require('./users').valid;

const router = express.Router();

const studentSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.ObjectId,
    reg: 'User'
  },
  student: {
    type: mongoose.Schema.ObjectId,
    reg: 'User'
  },
  price: String,
  startDate: Date,
  lessonLength: Number
})

const Student = mongoose.model('Student', studentSchema);


router.get('/', validateUser, (req, res) => {

})


module.exports = {
  routes: router
}