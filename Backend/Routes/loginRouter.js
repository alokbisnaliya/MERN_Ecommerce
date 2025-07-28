const express = require("express");
const usermodel = require('../models/usermodel');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(404).json({ message: "please enter your details" });

  try {
    let user = await usermodel.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "email not registered" });

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "incorrect password" });

    const jwtSecret = process.env.JWT_SECRET || "fallback-secret";

    let token = jwt.sign(
      { name: user.name, role: user.role, id: user._id },
      jwtSecret
    );

    // ✅ Fix applied here
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.status(200).json({ message: "login successful", role: user.role });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
