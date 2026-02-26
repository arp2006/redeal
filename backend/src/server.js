import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import http from "http";
import { initSocket } from "./socket.js";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

initSocket(server); // 🔥 only this initializes socket

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});