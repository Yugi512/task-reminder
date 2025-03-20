import Project from "../models/Projects.js"

export const getProjects = async (req,res,next) => {
    try{
        const projects = await Project.find()
        
        res.status(200).json({success: true, data: projects})
    }
    catch(error){
        next(error)
    }
}
export const postUserProject = async (req,res,next) => {
    try{
        const project = req.body;

        if(!project.user){
            const error = new Error('No User Id submitted')
            error.statusCode = 404
            throw error
        }

        const newProject = await Project.create(project)

        res.status(201).json({
            success: true,
            message: "Project successfully created",
            data: {
                newProject
            }
        })
    }
    catch(err){
        next(err)
    }

}

export const getProjectWitId = async (req,res,next) => {
    try{
        const {id} = req.params;

        const projects = await Project.findById(id).select()

        if(!projects) {
            const error = new Error('Project not found')
            error.statusCode = 404;
            throw error
        }

        res.status(200).json({success: true, data: projects})
    }
    catch(error){
        next(error)
    }
}
export const patchProjectWitId = async (req,res,next) => {
    try{ 
        const {id} = req.params;
        const update = req.body;

        const updatedProject = await Project.findByIdAndUpdate(id,update, { new: true, runValidators: true })

        if(!updatedProject){
            const error = new Error("Project not found")
            error.statusCode = 404
            throw error;
        }

        res.status(200).json({success: true, message: "Project successfully updated", data: {
            updatedProject
        }})

    }
    catch(error){
        next(error)
    }
}
export const deleteProjectWitId = async (req,res,next) => {
    try{    
        const {id} = req.params;

        const deletedProject = await Project.findByIdAndDelete(id)

        if(!deletedProject) {
            const error = new Error('Project not found')
            error.statusCode = 404
            throw error
        }

        res.status(200).json({success: true, message: 
            "Project successfully deleted"
        })
    } 
    catch(error){
        next(error)
    }
}