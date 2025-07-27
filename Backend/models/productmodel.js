// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ['phones', 'fruits', 'watches', 'laptops', 'clothing', 'electronics',"groceries"],// Add more as needed
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
  images: [String], // Array of image URLs
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Product', productSchema);
