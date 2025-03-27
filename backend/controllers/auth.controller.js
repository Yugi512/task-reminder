import mongoose from "mongoose"

import crypto from "crypto"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import User from "../models/Users.js";

import { CLIENT_URL, JWT_EXPIRES, JWT_SECRET, NODE_ENV } from "../config/env.js";

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
            user: {
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

// export const verifyEmail = async (req,res) => {
//     const {code} = req.body;

//     try{
//         const user = await User.findOne({
//             verificationToken: code,
//             verificationTokenExpiresAt: { $gt: Date.now()}
//         })
        
//         if(!user) return res.status(400).json({ success: false, message: 'Invalid or expired verification code'})
        
//         user.isVerified = true
//         user.verificationToken = undefined
//         user.verificationTokenExpiresAt = undefined

//         await user.save()

//         res.status(200).json({
//             success: true,
//             message: 'Email verified successfully',
//             user: {
//                 ...user._doc,
//                 password: undefined
//             }
//         })
//     }
//     catch(error){
//         console.error(`Error in verifying email: `, error)
//         throw new Error(`Error in verifying email: ${error}`)
//     }
// }

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

        const token =  jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES})

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 2 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            success: true,
            message: "User signed in successfully",
            user: {
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

// export const forgottenPassword = async (req,res,next) => {
//     const {email} = req.body;

//     try{
//         const user = await User.findOne({email})

//         if(!user) {
//             const error = new Error('Invalid email provided')
//             error.statusCode = 404;
//             throw error
//         }

//         const resetToken = crypto.randomBytes(20).toString('hex')
//         const restTokenExpiresAt = Date.now() + 1 * 60 *60 * 1000;

//         user.resetPasswordToken = resetToken;
//         user.resetPasswordExpiresAt = restTokenExpiresAt;

//         await user.save()

//         await sendPasswordResetEmail(user.email,`${CLIENT_URL}/reset-password/${resetToken}`)

//         res.status(200).json({success: true, message: "Password reset link sent to your email"})
//     }
//     catch(error){
//         console.error(`Error in resetting forgotten password: `, error)
//         throw new Error(`Error with resetting forgotten password:  ${error}`)
//     }
// }

// export const resetPassword = async (req,res,next) => {
//     const {token} = req.params;
//     const {password} = req.body;
//     try{
//         const user = await User.findOne({
//             resetPasswordToken: token,
//             resetPasswordExpiresAt: { $gt: Date.now()}    
//         })

//         if(!user) {
//             const error = new Error('Invalid or expired reset token')
//             error.statusCode = 404;
//             throw error
//         }

//         const salt = await bcrypt.genSalt(10)
//         const hashedPassword = await bcrypt.hash(password,salt)

//         user.password = hashedPassword;
//         user.resetPasswordToken = undefined;
//         user.resetPasswordExpiresAt = undefined;

//         await user.save()

//         await sendResetSuccessfulEmail(user.email)
//         res.status(200).json({sucess: true, message: 'Password reset successful'})
//     }
//     catch(error){
//         console.error('Error resetting password: ',error)
//         throw new Error(`Error in resetting the password: ${error}`)
//     }
// }

export const checkAuth = async (req,res,next) => {
    try{    
        const user = await User.findById(req.userId).select("-password")

        if(!user) {
            const error = new Error('User not found')
            error.statusCode = 404;
            throw error
        }

        res.status(200).json({success: true, user: user})
    }
    catch(error){
        throw new Error(`Error in authenticating user: ${error}`)
        return res.status(500).json({success: false, message: "Failure to authenticate user"})
    }
} 