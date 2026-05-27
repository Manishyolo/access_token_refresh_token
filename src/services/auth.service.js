const userModel = require("../models/userModel.js");
const {generateAccessToken,generateRefreshToken} = require("../utils/genrateTokens.js");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");


const RegisterService = async(userData)=>{
       try{
            const {username,email,password} = userData;
            console.log(userData,"from service");

            const existingUser = await userModel.findOne({email:email});

            if(existingUser){
                throw new Error("User already exists");
            }
            const hashpassword = await bcrypt.hash(password,10);
            
             
            const newUser = await userModel.create({
                username,
                email,
                password:hashpassword
            })

            console.log(newUser);
           
                const accessToken = generateAccessToken(newUser._id);
                const refreshToken = generateRefreshToken(newUser._id);

            newUser.refreshToken = refreshToken;
            await newUser.save();

           return {accessToken,refreshToken,newUser};

    }
    catch(err){
    
        throw new Error(err.message);
      
    }
}

const LoginService = async (userData)=>{
  try{

       const {email,password} = userData;
        
       const existingUser = await userModel.findOne({email:email});

       if(!existingUser){
        throw new Error("User not found");
       }

         const isPasswordValid = await bcrypt.compare(password,existingUser.password);

         if(!isPasswordValid){
            throw new Error("Invalid password");
         }

         const accessToken = generateAccessToken(existingUser._id);
         const refreshToken = generateRefreshToken(existingUser._id);
          
            existingUser.refreshToken = refreshToken;
            await existingUser.save();

         return {accessToken,refreshToken,user:existingUser};



    }catch(err){
        throw new Error(err.message);
    }


}

const getAccessTokenService = async (refreshToken)=>{
    try{
        const decoded = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);

        if(!decoded) throw new Error("unauthorized access");

        const user = await userModel.findById(decoded.id);

        if(refreshToken !== user.refreshToken) throw new Error("Unauthorized access");

        const accessToken = generateAccessToken(user._id);

        return accessToken;
    }
    catch(err){


    }
}

module.exports = {RegisterService,LoginService,getAccessTokenService};