const express = require('express');
const {LoginController,RegisterController,getAccessTokenController} = require('../controllers/auth.controller.js');
const authMiddleware = require('../middleware/auth.middleware.js');

const router = express.Router();

router.get("/me",authMiddleware,(req,res)=>{
    return res.status(200).json({message:"current loged in user",user:req.user})
})
router.post("/login", LoginController);
router.post("/register", RegisterController);
router.get("/get-accessToken",getAccessTokenController);

module.exports = router;    