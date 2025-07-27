const express = require('express');
const usermodel = require('../models/usermodel');
const cartmodel = require('../models/cartmodel');
const router = express.Router();
const ordermodel = require('../models/ordermodel')
// const Cart = req

router.post('/add', async (req, res) => {
  const { productId, quantity } = req.body;
  const userID = req.user.id;

  try {
    let user = await usermodel.findById(userID);
    if (!user) return res.status(404).json({ message: "No user found" });

    let cart = await cartmodel.findOne({ user: userID });
    if (!cart) {
      cart = await cartmodel.create({ user: userID });
      user.cart = cart._id;
      await user.save();
    }

    const existingProductIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingProductIndex > -1) {
      // Product exists, update quantity
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      // Product doesn't exist, add it
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();

    res.status(200).json({ message: "Item added to cart" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});



router.get('/products', async (req, res) => {
  let userID = req.user.id;
  try {
    // let user = await usermodel.find()
    let userCart = await cartmodel.findOne({ user: userID }).populate("products.product").lean();
    if (!userCart) return res.status(404).json({ message: "Cart is empty" })
    // console.log(userCart)
    res.status(200).json(userCart)


  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal Server Error" })
  }
})


// const pushOrders = (arr)=>{
//      arr.forEach(item => {
      
//     });
// }


router.post('/placeorder', async (req, res) => {
  const {address,phone,pincode,city,state,items,totalAmount} = req.body;
  console.log(totalAmount)
  
  let userID = req.user.id
  if(!userID) return res.status(404).json({message:"login to continue"})
  try {
    
    const order = await ordermodel.create({
       user:userID,
       shippingAddress:{
        address,
        phone,
        pincode,
        city,
        state
       },

       totalAmount

    
    })
   
   
    // console.log(address,phone,city,pincode,state);
    items.forEach ( async(item) => {
      await order.items.push({
        product:item.product._id,
        quantity:item.quantity
      })
    });
    
    if(order) console.log({"order":order})
  

     await order.save()
    
    res.status(200).json({message:"order placed successfully"})

  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal Server Error" })
  }

})


router.delete('/:prodcutId', async(req, res) => {
  const {prodcutId} = req.params;
  
  try {
    let usercart = await cartmodel.findOne({user:req.user.id});
    console.log(usercart)
    if(usercart){
       const index = usercart.products.findIndex(
        (item)=>{
          return item.product._id.toString() === prodcutId;
        }
       )
       if(index >-1){
          usercart.products.splice(index,1)
       }
       await usercart.save()
    }
    
    res.status(200).json({ message: "item removed" })


  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal Server Error" })
  }


});

module.exports = router;
