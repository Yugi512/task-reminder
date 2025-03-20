import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true,
        minLength: 2, 
        maxLenght: 50
    },
    firstName: {
        type: String,
        required: [true, "First Name is required"],
        trim: true,
        minLength: 2,
        maxLength: 50,
    },
    lastName: {
        type: String,
        required: [true, "Last Name is required"],
        trim: true,
        minLength: 2,
        maxLength: 50,
    },
    email: {
        type: String,
        required: [true, 'User email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Please fill a valid email address"]
    },
    password: {
        type: String,
        required: [true, "User password is required"],
        minLength: 6,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    isVerified:{
        type: Boolean,
        default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,   

}, {timestamps: true});

const User = mongoose.model('user', userSchema);

export default User;