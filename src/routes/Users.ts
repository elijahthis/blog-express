import express from "express";
import { allUsersController } from "../controller/UserController.js";

const router = express.Router();

// -------------------- Current User routes --------------------
router.get("/", allUsersController.get);
router.delete("/", allUsersController.delete);

export default router;
