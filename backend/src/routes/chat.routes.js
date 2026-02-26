import { Router } from "express";
import * as chatController from "../controllers/chat.controller.js";
import requireAuth from "../middleware/requireAuth.js";

const router = Router();

router.post("/conversations/start", requireAuth, chatController.startConversation)

router.get("/chats/:type", requireAuth, chatController.getChats);

router.get("/messages/:conversationId", requireAuth, chatController.getMessages);
router.post("/messages", requireAuth, chatController.sendMessage);


export default router;
