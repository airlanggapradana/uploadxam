import { Router } from "express";
import { handleChat } from "../services/chat.service";

const chatRouter = Router();

chatRouter.post("/", handleChat);

export default chatRouter;
