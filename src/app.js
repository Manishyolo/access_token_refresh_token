const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/Auth.routes.js');
const morgan = require('morgan');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));



app.use("/api/user", authRoutes);



module.exports = app;