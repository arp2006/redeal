import express from "express";
import cors from "cors";

import auth from "./middleware/auth.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import itemRoutes from "./routes/item.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import chatRoutes from "./routes/chat.routes.js";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://redeal-rust.vercel.app"
  ],
  credentials: true
}));
app.use(express.json());
app.use(auth);

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", itemRoutes);
app.use("/api", uploadRoutes);
app.use("/api", chatRoutes);

export default app;