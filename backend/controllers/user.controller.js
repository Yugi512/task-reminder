import User from "../models/Users.js";

export const getUsers = async (req,res,next) => {
    try{
        const users =  await User.find()

        res.status(200).json({success: true, data: users})
    }
    catch(error){
        next(error)
    }
}

export const getUser = async (req,res,next) => {
    try{
        const user =  await User.findById(req.params.id).select()

        if(!user){
            const error = new Error('User not found')
            error.statusCode = 404;
            throw error
        }

        res.status(200).json({success: true, data: user})
    }
    catch(error){
        next(error)
    }
}

export const patchUser = async (req,res,next) => {
    try{
        const {id} =  req.params;
        const updatedData = req.body;

        const updatedItem = await User.findByIdAndUpdate(id,updatedData, { new: true, runValidators: true })

        if(!updatedItem){
            const error = new Error('Item not found')
            error.statusCode = 404;
            throw error
        }

        res.status(200).json({success: true, data: updatedData})
    }
    catch(error){
        next(error)
    }
}

export const deleteUser = async (req,res,next) => {
    try{
        const {id} = req.params;

        const deletedUser = await User.findByIdAndDelete(id)

        if(!deletedUser){
            const error = new Error('User not found')
            error.statusCode = 404;
            throw error
        }

        res.status(200).json({success: true, message:"User succesfully deleted"})
    }
    catch(error){
        next(error)
    }
}
