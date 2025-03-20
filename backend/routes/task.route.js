import { Router } from "express";
import { deleteTaskWitId, getTasks, getTaskWitId, patchTaskWitId, postUserTask } from "../controllers/tasks.controller.js";

const tasksRouter = Router();

tasksRouter.get('/',getTasks)
tasksRouter.post('/',postUserTask)

tasksRouter.get('/:id',getTaskWitId)
tasksRouter.patch('/:id',patchTaskWitId)
tasksRouter.delete('/:id',deleteTaskWitId)

export default tasksRouter;