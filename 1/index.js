const express=require('express');
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
const register=require('./routes/register');
const authRoute=require('./routes/auth.js')
const trainsRoute=require('./routes/trains')

//creating a const string instead of dot env for simplicity do not use in prod
const DB_URL="mongodb+srv://root:passwordhehe@cluster0.glw1wym.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(DB_URL);


const app=express()

app.get("/",(req,res)=> res.send("seevr is on 6904"));


app.use(bodyParser.json());
app.use("/train/register",register);
app.use("/train/auth",authRoute);
app.use("/train/trains",trainsRoute);


app.listen(6900,()=>console.log("Sever listening on 6900"));