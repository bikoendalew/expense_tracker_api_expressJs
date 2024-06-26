const mongoose =require('mongoose')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
const JwtManager = require('../../../manager/jwtManager');

const login=async(req,res)=>{
    const userModel=mongoose.model('user');
   const{email,password}=req.body 

   if(!email) throw "email required"
   if(!password) throw "password required"

   const getUser=await userModel.findOne({email:email});
   if(!getUser) throw "unregisterd user";

   const comparePassword=await bcrypt.compare(password,getUser.password)
   if(!comparePassword) throw "email and password doesn't match"

   const accessToken=JwtManager(getUser)
   res.status(200).json({
        status:"success",
        message:"user successfull logged",
        accessToken:accessToken
       })
   


}

module.exports=login