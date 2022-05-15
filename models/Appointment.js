const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please enter your full Name'],
    lowercase: true,
  },
  phoneNum: {
    type: Number,
    required: [true, 'Please enter your Phone Number'],
  },
  date: {
    type: Date,
    required: [true, 'Please enter a date'],
  },
  time: {
    type: String,
    required: [true, 'Please enter a time'],
  },
  symptoms: {
    type: String,
    required: [true, 'Please enter a time'],
  },
});

const Appointment = mongoose.model('appointment', appointmentSchema);
module.exports = Appointment;
