const express = require('express');
const productmodel = require('../models/productmodel');
const router = express.Router();

router.get('/', async (req, res) => {
  const itemname = req.query.q;
  const limit = parseInt(req.query.limit) || 10;
  const currentPage = parseInt(req.query.currentPage) || 1;
  const skip = (currentPage - 1) * limit;

  try {
    const query = {
      title: { $regex: itemname, $options: 'i' }
    };

    const totalCount = await productmodel.countDocuments(query); 

    const products = await productmodel.find(query).skip(skip).limit(limit);

    res.status(200).json({
      products,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
});

module.exports = router;
