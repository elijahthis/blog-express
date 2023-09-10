import express from "express";
import {
	currentUserController,
	particularUserController,
} from "../controller/UserController.js";

const router = express.Router();

// -------------------- Current User routes --------------------
router.get("/", currentUserController.get);
router.patch("/", currentUserController.patch);
router.delete("/", currentUserController.delete);

// -------------------- Current User routes --------------------
router.get("/:id", particularUserController.get);
router.patch("/:id", particularUserController.patch);
router.delete("/:id", particularUserController.delete);

export default router;
