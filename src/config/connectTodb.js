const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();



const connectToDB = async ()=>{

    try{
        mongoose.connect(process.env.MONGODB_URI)
        console.log('Connected to MongoDB');

    }catch(err){
        console.error('Error connecting to MongoDB:', err);
    }

    
}

module.exports = connectToDB;