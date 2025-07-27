const express = require('express');
const router = express.Router();



router.get('/', async (req, res) => {
    try {
        let token = await req.cookies.token;
        if (token) {
            res.clearCookie("token")
        }
        res.status(200).json({ message: "successfully logged out" })
    } catch (error) {
        console.log(error);
        return res.status(200).json({ messsage: "internal server error" })
    }
})




module.exports = router;