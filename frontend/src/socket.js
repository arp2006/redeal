import { io } from "socket.io-client";

let socket = null;

export function connectSocket(userId) {
  if (socket) return; // prevent duplicate connections

  socket = io("http://localhost:3000", {
    query: { userId },
    transports: ["websocket"],
  });

  console.log("Socket connected");
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

export function getSocket() {
  return socket;
}