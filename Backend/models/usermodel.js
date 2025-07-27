// const mongoose = require('mongoose');

// let userSchema = new mongoose.Schema({
  // models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  address1: String,

  address2: String,

  phone: String,

  pincode:String,

  city:String,

  state:String,
  country:String,
  cart:{
     type: mongoose.SchemaTypes.ObjectId,
     ref:'Cart',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('User', userSchema);

