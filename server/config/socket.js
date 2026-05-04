import { Server } from "socket.io";

export const initSocket = (httpServer) => {
  const io = new Server(httpServer);
};
