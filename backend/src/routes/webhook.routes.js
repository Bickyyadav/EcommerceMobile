import express from "express";
import { handleClerkWebhook } from "../controllers/webhook.controller.js";

const router = express.Router();

router.post("/clerk", handleClerkWebhook);


export default router;

