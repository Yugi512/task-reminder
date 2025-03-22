import { Router } from "express";
import { signIn,verifyEmail, signUp, signOut, forgottenPassword, resetPassword, checkAuth } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const authRouter = Router();

authRouter.get('/check-auth',verifyToken, checkAuth)

authRouter.post('/sign-up',signUp)
authRouter.post('/sign-in',signIn)
authRouter.post('/sign-out',signOut)

authRouter.post('/verify-email',verifyEmail)
authRouter.post('/forgot-password',forgottenPassword)
authRouter.post('/reset-password/:token',resetPassword)

export default authRouter;