import * as chatService from "../services/chat.service.js";
import { getIO } from "../socket.js";

export async function startConversation(req, res) {
  try {
    const buyerId = Number(req.user.sub);
    const { itemId } = req.body;

    const conversation =
      await chatService.startConversation(itemId, buyerId);

    res.status(201).json(conversation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to start conversation" });
  }
}

export async function getChats(req, res) {
  try {
    const userId = req.user.sub;
    const { type } = req.params;
    if (!["buying", "selling"].includes(type)) {
      return res.status(400).json({ error: "Invalid chat type" });
    }
    const result = await chatService.getChats(userId, type);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getMessages(req, res) {
  try {
    const userId = Number(req.user.sub);
    const convId = Number(req.params.conversationId);

    const messages = await chatService.getMessages(convId, userId);
    res.json(messages);
  } catch (err) {
    console.error("GET MESSAGES ERROR:", err); // 👈 IMPORTANT

    if (err.message === "FORBIDDEN") {
      return res.status(403).json({ error: "Not authorized" });
    }

    res.status(500).json({
      error: "Internal server error",
      detail: err.message, // temporary
    });
  }
}

export async function sendMessage(req, res) {
  try {
    const userId = Number(req.user.sub);
    const { convId, msg } = req.body;

    if (!convId || !msg?.trim()) {
      return res.status(400).json({ error: "Invalid input" });
    }

    const { message, receiverId } = await chatService.sendMessage(Number(convId), userId, msg);
    const io = getIO();
    io.to(`user_${receiverId}`).emit("new_message", message);

    res.status(201).json(message);

  } catch (err) {
    console.error("SEND MESSAGE ERROR:", err);

    if (err.message === "FORBIDDEN") {
      return res.status(403).json({ error: "Not authorized" });
    }

    res.status(500).json({ error: "Internal server error" });
  }
}