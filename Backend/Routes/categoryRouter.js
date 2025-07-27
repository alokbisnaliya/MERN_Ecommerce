const express = require('express');
const { getCategories } = require('../controller/categoryController'); // Destructure the method from the exported object

const router = express.Router();

router.get('/', getCategories);  // Now this works!

module.exports = router;
