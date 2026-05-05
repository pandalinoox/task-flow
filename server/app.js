import { createServer } from "http";
import { intializeApp } from "./config/server";
import { initSocket } from "./config/socket";
import { config } from "dotenv";
import { initializeDb } from "./data/db";

config();

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

const startApp = async () => {
  try {
    await initializeDb(DB_URL);

    const app = intializeApp();

    const httpServer = createServer(app);

    initSocket(httpServer);

    httpServer.listen(PORT, () =>
      console.log(`Serve listening at port: ${PORT}`),
    );
  } catch (err) {
    console.log("Failed to start the server");
  }
};

startApp();
