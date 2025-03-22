import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

export const verifyToken = async (req,res, next) => {
    const token = req.cookies.token;
    if(!token) return res.status(401).json({success: false, message: 'Unauthorized - no token provided'})
    try{
        const decoded = jwt.verify(token, JWT_SECRET);

        if(!decoded) return res.status(401).json({success: false, message: 'Unauthorized - no token provided'})

        req.userId = decoded.userId;
        next()
    }
    catch(error){
        console.error(`Error verifying token: `, error)
        return res.status(500).json({success: false, message: "Server error, failure to authenticate token"})
    }
}

