import mongoose from "mongoose"
import { DATABASE_URL, NODE_ENV } from "../config/env.js"


if(!DATABASE_URL){
    throw new Error('Please define the MONGODB_URL enviornment variable inside the .env.<development/production>.local file')
}

const connectToDatabase = async () => {
    try{
        await mongoose.connect(DATABASE_URL)
        console.log(`Connected to database in ${NODE_ENV} mode`)
    }
    catch(err){
        console.error("Error connecting to database: ",err);
        process.exit(1);
    }
}

export default connectToDatabase;