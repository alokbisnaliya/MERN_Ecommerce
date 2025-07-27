const express = require('express');
const ordermodel = require('../models/ordermodel');

const router = express.Router();


router.get('/', async (req, res) => {
    const userID = req.user.id
    try {
        let orders = await ordermodel
            .find({ user: userID })
            .populate('items.product')
            .sort({ createdAt: -1 }); // ✅ newest first

        // console.log(orders)
        res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal server error" })
    }

})

module.exports = router