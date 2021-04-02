const express = require('express');
const mongoose = require('mongoose');
const Users = require('./users').model;
const validateUser = require('./users').valid;

const router = express.Router();

const studentSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  price: String,
  startDate: String,
  lessonLength: Number
})

const Student = mongoose.model('Student', studentSchema);


router.post('/', validateUser, async (req, res) => {
  if(!req.body.firstName && !req.body.lastName)
    return res.status(400).send({ message: 'firsname and lastnames are required' });

  try {
    const studentUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.firstName,
      password: `${req.body.firstName}${req.body.lastName}`,
      email: req.body.email,
      gender: req.body.gender
    });
    await studentUser.save();

    let student = new Student({
      teacher: req.user,
      student: studentUser,
      price: req.body.price,
      startDate: (new Date()).toUTCString(),
      lessonLength: parseInt(req.body.lessonLength)
    })
    await student.save();
    res.send({ student: student });
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get('/', validateUser, async (req, res) => {
  try {
    let students = await Student.find({ teacher: req.user }).populate('student');
    res.send({ students: students });
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.put('/:id', async (req, res) => {
  try {
    let student = await Student.findOne({
      _id: req.params._id
    });
    student.student.firstName = req.body.firstName;
    student.student.lastName = req.body.lastName;
    student.student.email = req.body.email;
    student.student.price = req.body.price;
    student.student.gender = req.body.gender;
    student.student.lessonLength = req.body.lessonLength
    student.save();
    res.sendStatus(200);    
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Student.deleteOne({
      _id: req.params._id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


module.exports = {
  routes: router,
  model: Student
}