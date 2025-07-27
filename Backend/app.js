const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

const cors = require('cors');
const cookieParser = require('cookie-parser');
const isAuthenticated = require('./middleware/isAuthenticated');

const PORT = process.env.PORT || 3000;

// Connect DB
require('./config/mongoooseConnection');

// CORS Middleware
app.use(cors({
  origin: 'https://mern-ecommerce-tau-nine.vercel.app/',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/register', require('./Routes/registerRouter'));
app.use('/login', require('./Routes/loginRouter'));
app.use('/api/products', require('./Routes/productRouter'));
app.use('/api/products/filter', require('./Routes/productsFilterRouter'));
app.use('/api/categories', require('./Routes/categoryRouter'));
app.use('/api/product', require('./Routes/findProductRouter'));
app.use('/api/search', require('./Routes/searchRouter'));
app.use('/api/banner', require('./Routes/bannerRouter'));

// Auth routes
app.use('/user', isAuthenticated, require('./Routes/profileRouter'));
app.use('/api/cart', isAuthenticated, require('./Routes/cartRouter'));
app.use('/api/myorders', isAuthenticated, require('./Routes/myordersRouter'));
app.use('/api/buynow', isAuthenticated, require('./Routes/buynowRouter'));
app.use('/api/isLoggedin', isAuthenticated, require('./Routes/isLoggedinRouter'));
app.use('/api/logout', isAuthenticated, require('./Routes/logoutRouter'));
app.use('/api/cancel-order', isAuthenticated, require('./Routes/orderCancelRouter'));
app.use('/api/getuserRole', isAuthenticated, require('./Routes/getuserRoleRouter'));

// Admin routes
app.use('/api/ordersData', require('./AdminRoutes/fetchorderRouter'));
app.use('/api/topSelling/products', require('./AdminRoutes/topSellingRouter'));
app.use('/api/graph', require('./AdminRoutes/salesGraphRouter'));

// Server start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


console.log("Redeployed at", new Date());
