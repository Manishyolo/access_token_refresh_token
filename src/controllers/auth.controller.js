const {LoginService,RegisterService  }= require("../services/auth.service.js")



const RegisterController = async (req,res)=>{
    try{

        console.log(req.body);
     const {accessToken,refreshToken,newUser} = await RegisterService(req.body);
     
     res.cookie("accessToken",accessToken,{
        httpOnly: true,
        sameSite: "lax",
        secure: "false",
        maxAge: 10 * 60 * 1000
     })
    res.cookie("refreshToken",refreshToken,{
        httpOnly: true,
        sameSite: "lax",
        secure: "false",
        maxAge: 24 * 60 * 60 * 1000
    })

    return res.status(201).json({message:"User registered successfully",user:newUser});
 

    }
    catch(err){
        res.status(500).json({message:err.message});
    }
 

}

const LoginController = async (req,res)=>{
    try{
        const {accessToken,refreshToken,user} = await LoginService(req.body);
        res.cookie("accessToken",accessToken,{
            httpOnly: true,
            sameSite: "lax",
            secure: "false",
            maxAge: 10 * 60 * 1000
         }) 
       res.cookie("refreshToken",refreshToken,{
        httpOnly: true,
        sameSite: "lax",
        secure: "false",
        maxAge: 24 * 60 * 60 * 1000
       })

       return res.status(200).json({message:"Login successful",user:user});

    }catch(err){
        res.status(500).json({message:err.message});
    }
  
}


module.exports = {RegisterController,LoginController};