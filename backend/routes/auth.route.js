import { Router } from "express";
import { signIn, signUp, signOut, checkAuth } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const authRouter = Router();

authRouter.get('/check-auth',verifyToken, checkAuth)

authRouter.post('/sign-up',signUp)
authRouter.post('/sign-in',signIn)
authRouter.post('/sign-out',signOut)

export default authRouter;