const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();
const userModel = require("../models/userModel.js")

const authMiddleware = async (req,res,next)=>{
    try{
          
       const accessToken = req.cookies.accessToken;

       if(!accessToken){
        res.status(401).json({message:"Unauthorized"})
       }

       const decoded = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET)


       if(!decoded){
        res.status(401).json({message:"Unauthorized"})
       }

       const user = await userModel.findById(decoded.id)

       req.user = user;
       next();

    }
    catch(err){
        throw new Error(err)
    }
}

module.exports = authMiddleware;