import express from "express";
import cors from "cors";
import userRouter from "../routes/user.routes";
import cookieParser from "cookie-parser";
import { authentication } from "../middlewares/auth.middleware";
import errorMiddleware from "../middlewares/error.middleware";
import morgan from "morgan";

export const intializeApp = () => {
  const app = express();
  app.use(cors());
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(cookieParser());

  app.use("/api/user", userRouter);
  app.use(authentication);

  app.use(errorMiddleware);

  return app;
};
