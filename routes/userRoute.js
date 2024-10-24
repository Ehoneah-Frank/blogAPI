import { Router } from "express";
import { registerUser, loginUser, getUserDetails } from "../controllers/userController.js";
import verifyToken from "../middleware/verifyToken.js";

const userRouter = Router();


userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/me', verifyToken, getUserDetails);

export default userRouter;