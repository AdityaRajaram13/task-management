const mongoose = require("mongoose")
const url = process.env.MONGO_URI

const connectDB = async() =>{
    try {
        await mongoose.connect(url);
        console.log('connected to database')
    } catch (error) {
        console.error(`Error connecting to the database: ${error}`);
        
    }
}

module.exports = connectDB;