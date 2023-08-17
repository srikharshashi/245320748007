const express = require("express");
const router = express.Router();
const User=require('../models/User')
const JWT_SECRET="hehehe";
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');


router.post("/",async(req,res)=>{
    try{

    const { rollNo, password, ownerName, companyName, ownerEmail } = req.body;

    const user = await User.findOne({ $or: [{ rollNo }, { ownerEmail }] });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch || user.ownerName !== ownerName || user.companyName !== companyName) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ "token_type":"Bearer",access_token:token,expires_in:"1h" });
  } catch (error) {
    console.error('Error authenticating user:', error);
    return res.status(500).json({ message: 'An error occurred' });
  }


})

module.exports = router;
