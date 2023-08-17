const express = require("express");
const router = express.Router();
const User=require('../models/User')
const bcrypt=require('bcrypt');

router.post("/", async (req, res) => {
  try {
    const { companyName, ownerName, rollNo, ownerEmail, accessCode } = req.body;

    if (accessCode !== "YIFnHZ") {
      return res.status(400).json({ message: "Invalid access code" });
    }

    const us=await User.findOne({ownerEmail});

    if(us) return res.status(400).json({ message: "User already exists" });

    const randomPassword = Math.random().toString(36).slice(-8);

    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    const newUser = new User({
      companyName,
      ownerName,
      rollNo,
      ownerEmail,
      password: hashedPassword
    });

    const savedUser= await newUser.save();
    

    return res.status(201).json({
      email: savedUser.ownerEmail,
      password: randomPassword,
      clientId:savedUser._id
    });


  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;
