const express = require('express');
const productmodel = require('../models/productmodel');
const router = express.Router();



router.get('/recommandation', async (req, res) => {
  const { recommandBy } = req.query;

  // const RandomNumber = (min, max) => {
  //   return Math.floor(Math.random() * (max - min + 1)) + min
  // }

  // let skip = RandomNumber(5, 15);

  try {
    if (recommandBy) {
      let products = await productmodel.aggregate([
        {
          $match: {
            category: { $regex: new RegExp(recommandBy, "i") }
          }
        },
        {
          $sample: { size: 10 }
        }
      ]);

      // console.log(products.length)
      if (products.length > 0) {
        res.status(200).json({ products })
      } else {
        return res.status(404).json({ message: "No Recommandation" })
      }
    }


  } catch (error) {
    console.error("Recommandation Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }


})

router.get('/:id', async (req, res) => {
  let id = req.params.id;
  try {
    let product = await productmodel.findById(id);
    if (!product) return res.status(404).json({ message: "Product not Found" })

    res.status(200).json({ message: "success", product })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "internal server error" })
  }


})



module.exports = router