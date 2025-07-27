const express = require("express");
const usermodel = require('../models/usermodel')
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/',async (req,res)=>{
   const {email,password} = req.body;
   if(!email||!password) return res.status(404).json({message:"please enter your details"})
   try {
      let user = await usermodel.findOne({email});
      if(!user) return res.status(404).json({message:"email not registered"})
      
      const isMatch = await bcrypt.compare(password,user.password);
      // console.log(isMatch);
      if(!isMatch) return res.status(400).json({message:"incorrect password"});

      let token = await jwt.sign({name:user.name , role:user.role, id:user._id},"your_secret_key");
      // console.log({"the_token":token})
      res.cookie("token",token);
      // console.log("success")
      res.status(200).json({message:"login successfull",role:user.role })



   } catch (error) {
     return res.status(500).json({message:"Internal server error"})
   }
})

module.exports = router;