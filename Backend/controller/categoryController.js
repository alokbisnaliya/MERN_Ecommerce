
// categoryController.js

const productmodel = require("../models/productmodel");


exports.getCategories = async (req, res) => {
    // const {categories} = req.params;
    try {
      
      const categories = await productmodel.distinct("category");
      // console.log(categories) // Replace with actual logic
      let catWithImages = await Promise.all( categories.map(async(cat)=>{
        let product =   await  productmodel.findOne({category:cat});
        return (
          {
            category:cat,
            image:product?.images[0] || null
          }
        )
      
      })
    )
      // console.log(catWithImages)
      res.status(200).json({catWithImages});
    } catch (error) {
      res.status(500).json({ message: 'Error fetching categories' });
    }
  };
  