const express = require('express');
const ordermodel = require('../models/ordermodel');
const router = express.Router();


router.patch('/:productID', async (req, res) => {
    try {
        let  {productID}  = req.params;
        // console.log(productID);
        let order = await ordermodel.findById(productID);
        
        order.cancellationReason = req.body.reason
        order.status ='cancelled'
        await order.save()

        res.status(200).json({ message: "Cancelled Successfully" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = router;