const express = require('express');
const ordermodel = require('../models/ordermodel');
const router = express.Router();


router.get('/', async (req, res) => {
   try {
      let today = new Date()
      //  console.log(date) 
      let startTime = new Date(today)
      let endTime = new Date(today)
   
    
      startTime.setHours(9, 0, 0, 0);
      endTime.setHours(17, 0, 0, 0);
      
       console.log(startTime)
      let data = await ordermodel.aggregate([
         { $match: { createdAt: { $gte: startTime, $lte: endTime } } },
        

      ])
      if (!data){
          console.log("no data found")
      }else{
         console.log(data)
      }
     
    


      res.status(200).json({ message: "success" })

   } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "internal server error" })
   }
})


module.exports = router;