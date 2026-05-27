const express = require('express');
const {LoginController,RegisterController,getAccessTokenController} = require('../controllers/auth.controller.js');


const router = express.Router();

router.post("/login", LoginController);
router.post("/register", RegisterController);
router.get("/get-accessToken",getAccessTokenController);

module.exports = router;    