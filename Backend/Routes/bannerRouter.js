const express = require('express');
const productmodel = require('../models/productmodel');
const router = express.Router();

router.get('/data', async (req, res) => {
  try {
    const products = await productmodel.aggregate([
      {
        $facet: {
          watches: [
            { $match: { category: "watches" } },
            { $limit: 2 }
          ],
          phones: [
            { $match: { category: "phones" } },
            { $limit: 2 }
          ]
        }
      }
    ]);
    
    

    // console.log(products)

    // Combine both arrays (optional)
    
    const combined = [...products[0].watches, ...products[0].phones];
   let nameArry =[];
   combined.forEach((item)=>{
      nameArry.push({_id:item._id,title:item.title});
   })
  //  console.log(nameArry);



    res.status(200).json(combined); // ✅ flat array of 4 products

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
});

module.exports = router;
