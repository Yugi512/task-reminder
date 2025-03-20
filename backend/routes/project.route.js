import { Router } from "express";
import { getProjects, getProjectWitId, patchProjectWitId, postUserProject, deleteProjectWitId } from "../controllers/project.controller.js";

const projectRouter = Router();

projectRouter.get('/',getProjects)
projectRouter.post('/',postUserProject)

projectRouter.get('/:id', getProjectWitId)
projectRouter.patch('/:id', patchProjectWitId)
projectRouter.delete('/:id', deleteProjectWitId)


export default projectRouter;