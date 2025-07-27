const express = require('express');
const router = express.Router();


router.get('/',(req,res)=>{
  try {
      let role = req.user.role;
      // console.log(role);
      res.status(200).json(role)

  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"internal server error"})
  }

    
})

module.exports = router;