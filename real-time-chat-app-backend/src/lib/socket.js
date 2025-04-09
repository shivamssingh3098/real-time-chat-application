import { Server } from "socket.io";
import express from "express";
import http from "http";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// used to store online users
const userSocketMap = {};
io.on("connection", (socket) => {
  console.log("A user connected", socket.id);
  const userId = socket.handshake.query.userId;
  console.log("A user connected userId", userId);

  if (userId) {
    userSocketMap[userId] = socket.id;
  }
  console.log("Object.keys(userSocketMap)", Object.keys(userSocketMap));

  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  console.log("userSocketMap", userSocketMap);
  socket.on("currentTypingUser", (data) => {
    const socketIdIs = getReceiverSocketId(data.selectedUser._id);
    console.log("typingUser", data);
    io.to(socketIdIs).emit("currentTypingUser", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    delete userSocketMap[userId];

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
