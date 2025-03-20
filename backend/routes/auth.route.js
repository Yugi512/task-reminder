import { Router } from "express";
import { signIn,verifyEmail, signUp, signOut } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post('/sign-up',signUp)
authRouter.post('/verify-email',verifyEmail)
authRouter.post('/sign-in',signIn)
authRouter.post('/sign-out',signOut)

export default authRouter;