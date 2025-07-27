const express = require('express');
const router = express.Router();
const usermodel = require("../models/usermodel")



router.get('/data', async (req, res) => {
    if (!req.user || !req.user.id) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const userID = req.user.id;

    try {
        const user = await usermodel.findById(userID);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


router.patch('/update/profile', async (req, res) => {
    const formData = req.body;  //
    let userID = req.user.id
 
    try {
        let user = await usermodel.findByIdAndUpdate(userID, {
            name: formData.name,
            email: formData.email,
            address1: formData.address1,
            address2: formData.address2,
            pincode: formData.pincode,
            state: formData.state,
            city: formData.city,
            country: formData.country,
            phone: formData.phone

        });

        if (!user) return res.status(404).json({ message: "Can't find your account" });
       
        res.status(200).json({ message: "updated successfully"})


    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal Server Error"})
    }



});

module.exports = router;
