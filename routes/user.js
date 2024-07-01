import { Router } from "express";
import {
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser
} from "../controllers/user.js";
import verifyToken from "../middleware/verifyToken.js";

const userRouter = Router();

userRouter.get('/find/:userId', getUserById);
userRouter.get('/findAll', getAllUsers);
userRouter.put('/updateUser/:userId', verifyToken, updateUser);
userRouter.delete('/deleteUser/:userId', verifyToken, deleteUser);

export default userRouter;
