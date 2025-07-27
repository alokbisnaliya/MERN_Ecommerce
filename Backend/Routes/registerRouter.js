const express = require('express');
const router = express.Router();
const usermodel = require('../models/usermodel');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

router.post('/', async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    try {
        console.log({ name, email, password, confirmPassword });
        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "Please enter all details" });
        }

        let existinguser = await usermodel.findOne({ email });
        if (existinguser) return res.status(409).json({ message: 'Already registered' });

        let hashedPass = await bcryptjs.hash(password, 10);

        let newuser = await usermodel.create({
            name,
            email,
            password: hashedPass,
            confirmPassword: hashedPass,
        });

        res.status(200).json({ message: "Registration Successfull" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
});

module.exports = router;
