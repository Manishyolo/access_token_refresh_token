const express = require("express");
const authMiddleware = require("../middleware/auth.middleware.js");

const HomeRouter = express.Router();



HomeRouter.get("/",authMiddleware,(req,res)=>{
    res.status(200).json({message:"Welcome to the home page",user:req.user})
})

module.exports = HomeRouter;