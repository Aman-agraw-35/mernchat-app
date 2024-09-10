import express from "express";
import { deleteMessage } from "../controllers/deleteController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/delete/:messageId").delete(isAuthenticated , deleteMessage);

export default router;