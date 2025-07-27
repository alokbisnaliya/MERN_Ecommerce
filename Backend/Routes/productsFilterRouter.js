const express = require('express');

const router = express.Router();
const {getProductsBycategory} = require('../controller/productsFilter');

router.get('/',getProductsBycategory);




module.exports = router