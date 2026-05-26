const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();


const generateAccessToken = (userId)=>{
     return jwt.sign({id:userId},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"10m"});
}

const generateRefreshToken = (userId)=>{
    return jwt.sign({id:userId},process.env.REFRESH_TOKEN_SECRET,{expiresIn:"7d"});
}

module.exports = {generateAccessToken,generateRefreshToken};