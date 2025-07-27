const express = require('express');
const { getAllProducts } = require('../controller/productController');
const productmodel = require('../models/productmodel');

const router = express.Router();

router.get('/', getAllProducts);
// router.get('/:category', getProductsByCategor

module.exports = router;
