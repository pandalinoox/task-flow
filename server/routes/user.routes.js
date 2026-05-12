import { Router } from "express";
import * as userController from "../controllers/user.controller";

const userRouter = Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.get("/generate-token", userController.generateToken);
userRouter.get("/logout", userController.logout);

export default userRouter;
