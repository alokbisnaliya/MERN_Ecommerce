const express = require('express');
const ordermodel = require('../models/ordermodel');
const router = express.Router();

router.get('/', async(req,res)=>{
   try {
    let products = await ordermodel.aggregate([
        {$unwind:"$items"},
        {$group:{
            _id:"$items.product",
            count:{$sum:"$items.quantity"}
        }},
        {$lookup:{
            from:"products",
            localField:"_id",
            foreignField:"_id",
            as:"data"
        }},
        {$sort:{
            count:-1
        }},
        {$limit:4}
     
    ])
  

    // console.log(products);
    res.status(200).json(products)
    
    
   } catch (error) {
    console.log(error);
    return res.status(500).json({message:"internal Server Error"})
   }

})


// const filterData = (arr)=>{
//    let newarr = [];
//    arr.forEach(item => {
//      if(arr.count )
      
//    });
// }

module.exports = router;