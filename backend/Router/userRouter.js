import express from 'express';
import { userRegistrationController,userLoginController,showUserController } from '../controller/userController.js';
const userRouter = express.Router();
userRouter.post("/userRegistration",userRegistrationController);
userRouter.post("/userLogin",userLoginController);
userRouter.get("/showUser",showUserController);
export default userRouter;
