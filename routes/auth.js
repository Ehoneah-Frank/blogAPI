import { Router } from "express";
import authRouter from "../controllers/auth.js";
import (authRouter)


//  Create a router
const authenticationRouter = express.Router();

// Define routes
authenticationRouter.use('/auth', authRouter);

// Export router
export default authenticationRouter;