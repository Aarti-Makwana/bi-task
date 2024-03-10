import express from "express"
import { createChatController,userChatsController,findChatController } from "../controller/chatController.js";
const chatRouter =express.Router();
chatRouter.post("/",createChatController)
chatRouter.get("/:userId",userChatsController)
chatRouter.get("/find/:firstId/:secondId",findChatController)

export default chatRouter;