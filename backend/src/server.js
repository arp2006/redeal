import dotenv from "dotenv";
import http from "http";
import { initSocket } from "./socket.js";
import app from "./app.js";
import { initDb } from "./config/initDb.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

initSocket(server); // 🔥 only this initializes socket

const startServer = async () => {
  try {
    await initDb();
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server due to database initialization error:", error);
    process.exit(1);
  }
};

startServer();