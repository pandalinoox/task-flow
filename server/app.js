import { createServer } from "http";
import express from "express";
import { intializeApp } from "./config/server";
import { initSocket } from "./config/socket";
import { initializeDb } from "./data/db";
import dotenvConfig from "./config/dotenv";

const PORT = dotenvConfig.PORT;

const startApp = async () => {
  try {
    await initializeDb();

    const app = intializeApp();

    const httpServer = createServer(app);

    initSocket(httpServer);

    httpServer.listen(PORT, () =>
      console.log(`Server listening at port: ${PORT}`),
    );
  } catch (err) {
    console.log("Failed to start the server");
  }
};

startApp();
