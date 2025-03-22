import {config} from "dotenv";

config({path: `.env.${process.env.NODE_ENV || 'development'}.local`})

export const {
    PORT, 
    NODE_ENV, 
    DATABASE_URL,
    JWT_SECRET,JWT_EXPIRES,
    ARCJET_KEY,ARCJET_ENV,
    MAILTRAP_TOKEN,MAILTRAP_ENDPOINT,
    CLIENT_URL
} =  process.env;