const express = require('express');
const ordermodel = require('../models/ordermodel');
const router = express.Router();

// function getorderinfo (orders){
//      let orderinfo = [];
//      orders.forEach((order)=>{
//          orderinfo.push(order.productinfo);
        
//     })
//     return orderinfo
// }

router.get('/',async(req,res)=>{
   try {
    
    // console.log(limit)
    const currentpage = parseInt(req.query.currentpage)
    const limit = parseInt(req.query.limit)
    const skip = parseInt((currentpage-1 )*limit)
    // let orders = await ordermodel.find().populate('items.product');
    // console.log(orders)
    let orders = await ordermodel.aggregate([
       {$unwind:"$items"},
       {$group:{_id:'$items.product',totalQuantity:{$sum:"$items.quantity"}}},
       {$lookup:{
        from:"products",
        localField:"_id",
        foreignField:"_id",
        as:"productinfo"
       }},
       {$skip:skip},
       {$limit:limit}
       
    ])
    
    // console.log(getorderinfo(orders))// console.log(orders)
    if(orders){
        totalpages = Math.ceil(orders.length/4)
        res.status(200).json({orders,totalpages})
    }
    else{
        res.status(404).json({message:"No order Found"})
    }
   } catch (error) {
    console.log(error)
    return res.status(500).json({message:"internal Server error!"})
   }
})

module.exports = router;


