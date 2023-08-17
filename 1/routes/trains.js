const express = require("express");
const router = express.Router();
const Train=require('../models/Train')
const JWT_SECRET="hehehe";
const jwt=require('jsonwebtoken');

//i am using a mddle to parse JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    // console.log(authHeader);
    const token=authHeader;
    
    if (!token) {
      return res.status(401).json({ message: 'Token not provided' });
    }
  
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Token verification failed' });
      }
  
      req.user = user;
      next();
    });
  };
  

router.get("/",authenticateToken,async(req,res)=>{
    try {
        const trains = await Train.find();
        return res.status(200).json(trains);
      } catch (error) {
        console.error('Error fetching trains:', error);
        return res.status(500).json({ message: 'An error occurred' });
      }    
});

router.get("/:trainId",authenticateToken,async(req,res)=>{
    try {
        const id=req.params.trainId;
        const trains = await Train.findById(id);
        return res.status(200).json(trains);
      } catch (error) {
        console.error('Error fetching trains:', error);
        return res.status(500).json({ message: 'An error occurred' });
      }    
});





module.exports = router;
