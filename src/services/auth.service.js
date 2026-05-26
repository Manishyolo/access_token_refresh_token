const userModel = require("../models/userModel.js");
const {generateAccessToken,generateRefreshToken} = require("../utils/genrateTokens.js");

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

         return {accessToken,refreshToken,user:existingUser};



    }catch(err){
        throw new Error(err.message);
    }


}

module.exports = {RegisterService,LoginService};