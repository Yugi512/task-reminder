import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Enter a title for task"],
        trim: true,
        minLength: 2,
        maxLength: 100,
    },
    description: {
        type: String,
        minLength: 2,
        maxLength: 550,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    priority: {
        type: String,
        enum: ['urgent',"high","normal","low"]
    },
    completed: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ['to do','in progress',"completed","expired"],
        default: 'in progress'
    },
    startDate: {
        type: Date,
    },
    dueDate: {
        type: Date
    }
},{ timestamps: true})

// if(!this.startDcate){
//     this.startDate = Date.now()
// }

// if(Date .now() > this.dueDate ){
//     this.status = 'expired'
// }

const Project = mongoose.model('Project', projectSchema);

export default Project;