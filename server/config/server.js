import express from "express";
import cors from "cors";

export const intializeApp = () => {
  const app = express();
  app.use(cors());
  return app;
};
