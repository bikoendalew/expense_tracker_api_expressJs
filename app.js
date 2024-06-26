require('express-async-errors')
const cors=require('cors')
require('dotenv').config()
const express = require('express');
const mongoose=require('mongoose')
const errorHandler = require('./handlers/errorHandler');
const userRouters = require('./modules/user/user.routes.js');
const transactionRoutes = require('./modules/transaction/transaction.js');



const app=express();
app.use(express.json());

//model
require('./models/user.model.js')
require('./models/transaction.model')

//routes
app.use('/api/user',userRouters)
app.use('/api/transaction',transactionRoutes)

app.all("*",(req,res,next)=>{
    res.status(404).json({status:"failed",message:"not found"})
})
app.use(errorHandler);

mongoose.connect(process.env.mongoDB,{}).then(()=>{
    app.listen(process.env.port,()=>{
        console.log("RUNNING");
    })
}).catch(()=>{
    console.log("NOT CONNECTED");
})