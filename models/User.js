const mongoose = require('mongoose');

//Creates a MongoDB schema from the database with the users data.

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  age: {
    type: Number,
    required: true
  },
  location: {
    type: String,
  },
  occupation: {
    type: String,
  }
});

//Creates a model from the schema.
const User = mongoose.model('User', UserSchema);

module.exports = User;