require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    // server listen code yahan
  })
  .catch((err) => {
    console.log('❌ MongoDB connection error:', err);
  });
