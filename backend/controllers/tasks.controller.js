import Task from "../models/Tasks.js";

export const getTasks = async (req,res,next) => {
    try{
        const tasks = await Task.find()

        res.status(200).json({success:true, data: tasks})
    }
    catch(error){
        next(error)
    }
}

export const postUserTask = async (req,res,next) => {
    try{
        const task = req.body
        
        if(!task.user){
            const error = new Error('No User Id submitted')
            error.statusCode = 404
            throw error
        }

        const newTask = await Task.create(task)

        res.status(201).json({
            success: true,
            message: "Task successfully created",
            data:{
                newTask
            }
        })
    }
    catch(err){
        next(err)
    }
}

export const getTaskWitId = async (req,res,next) => {
    try{ 
        const {id} = req.params;

        const task = await Task.findById(id).select();

        if(!task){
            const error = new Error('Task not found')
            error.statusCode = 404
            throw error
        }

        res.status(200).json({success: true, data: task})
    }
    catch(err){
        next(err)
    }
}
export const patchTaskWitId = async (req,res,next) => {
    try{
        const {id} = req.params;
        const update = req.body;

        const updatedTask = await Task.findByIdAndUpdate(id,update, { new: true, runValidators: true })

        if(!updatedTask) {
            const error = new Error('Task not found')
            error.statusCode = 404;
            throw error
        }

        res.status(200).json({success: true, data: updatedTask})
    }
    catch(err){
        next(err)
    }
}
export const deleteTaskWitId = async (req,res,next) => {
    try{
        const {id} = req.params;

        const deletedTask = await Task.findByIdAndDelete(id)

        if(!deletedTask){
            const error = new Error('Task not found')
            error.statusCode = 404;
            throw error
        }

        res.status(200).json({success: true, message:"Task succesfully deleted"})
    }
    catch(err){
        next(err)
    }
}
