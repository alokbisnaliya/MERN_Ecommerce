const express = require('express');
const productmodel = require('../models/productmodel');
const router = express.Router();



router.get('/recommandation', async (req, res) => {
  const { recommandBy } = req.query;

  try {
    if (!recommandBy || recommandBy.trim() === "") {
      return res.status(400).json({ message: "Missing recommandBy in query" });
    }

    const trimmedCategory = recommandBy.trim();

    console.log("🔍 recommandBy:", trimmedCategory); // Debug

    const products = await productmodel.aggregate([
      {
        $match: {
          category: { $regex: new RegExp(`^${trimmedCategory}`, "i") }
        }
      },
      {
        $sample: { size: 10 }
      }
    ]);

    console.log("🔢 Matched products:", products.length); // Debug

    if (products.length > 0) {
      return res.status(200).json({ products });
    } else {
      return res.status(404).json({ message: "No Recommendation" });
    }
  } catch (error) {
    console.error("❌ Recommendation Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


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