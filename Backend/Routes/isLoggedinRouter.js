const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        let role = req.user.role
        let token = req.cookies.token;
        let isLoggedin;
        if (token) {
            isLoggedin = true
        } else {
            isLoggedin = false
        }
        
        // console.log(token)
        // console.log(isLoggedin)
        // console.log(req.user.role)
        res.status(200).json({isLoggedin , role})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" })
    }

})





module.exports = router;