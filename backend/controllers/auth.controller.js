import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import User from "../models/Users.js";
import bcrypt from "bcryptjs"
import { JWT_EXPIRES, JWT_SECRET, NODE_ENV } from "../config/env.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js"

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction()
    try{    
        const {username, firstName, lastName , email, password} = req.body;

        if(!username || !firstName || !lastName || !email || !password) {
            throw new Error("All fields are required")
        }

        const existingUser = await User.findOne({email})

        if(existingUser){
            const error = new Error('User already exists')
            error.statusCode = 409;
            throw error
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const newUser = await User.create([{
            username,
            firstName, 
            lastName, 
            email, 
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
        }], { session })

        const token = jwt.sign({userId: newUser[0]._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES})

        await sendVerificationEmail(newUser[0].email, verificationToken)

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 1 * 24 * 60 * 60 * 1000
        })

        await session.commitTransaction()
        session.endSession()

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: {
                token, 
                user: newUser[0]
            }
        })

    }
    catch (err){
        await session.abortTransaction()
        session.endSession()
        next(err)
    }
}

export const verifyEmail = async (req,res) =>{
    const {code} = req.body;

    try{
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now()}
        })
        
        if(!user) return res.status(400).json({ success: false, message: 'Invalid or expired verification code'})
        
        user.isVerified = true
        user.verificationToken = undefined
        user.verificationTokenExpiresAt = undefined

        await user.save()

        await sendWelcomeEmail(user.email,user.username)

        res.status(200).json({
            success: true,
            message: 'Email verified successfully',
            data: {
                ...user._doc,
                password: undefined
            }
        })
    }
    catch(error){
        console.error(`Error in verifying email: `, error)
        throw new Error(`Error in verifying email: ${error}`)
    }
}


export const signIn = async (req, res, next) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email})

        if(!user) {
            const error = new Error('User not found')
            error.statusCode = 404;
            throw error
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid){
            const error = new Error("Invalid Password")
            error.statusCode = 401;
            throw error
        }

        const token =  jwt.sign({userID: user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES})

        res.status(200).json({
            success: true,
            message: "User signed in successfully",
            data: {
                token, 
                user,
            }
        })
    }
    catch (error){
        next(error)
    }
}

export const signOut = async (req, res, next) => {
    try{
        res.clearCookie('token')
        res.status(200).json({ message: 'Logged out successfully'});
    }
    catch(err){
        res.status(409).json({success:false, error: err.message})

    }
}