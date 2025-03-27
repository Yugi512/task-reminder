import express from "express"
import cookieParser from "cookie-parser"
import {PORT} from "./config/env.js"
import cors from 'cors'

import authRouter from "./routes/auth.route.js"
import userRouter from "./routes/user.route.js"
import projectRouter from "./routes/project.route.js"
import tasksRouter from "./routes/task.route.js"

import connectToDatabase from "./database/mongodb.js"
import errorMiddleware from "./middlewares/error.middleware.js"
import arcjetMiddelware from "./middlewares/arcjet.middleware.js"

const app = express()

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
// app.use(arcjetMiddelware)

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/projects', projectRouter)
app.use('/api/v1/tasks', tasksRouter)

app.use(errorMiddleware)

app.listen(PORT , async () => {
    console.log(`server is running on http://localhost:${PORT}`);

    await connectToDatabase();
}) 

export default app