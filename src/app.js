const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/Auth.routes.js');
const HomeRouter = require('./routes/Home.routes.js');
const morgan = require('morgan');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));




app.use("/api/user", authRoutes);



app.use("/api/home", HomeRouter);

module.exports = app;