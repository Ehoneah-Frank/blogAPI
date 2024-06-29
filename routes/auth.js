import { Router } from "express";
import authRouter from "../controllers/auth.js";
import (authRouter)


//  Create a router
const authenticationRouter = Router();

// Define routes
authenticationRouter.post('/auth', authRouter);

// Export router
export default authRouter;