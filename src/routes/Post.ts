import express from "express";
import {
	allPostsController,
	createPostController,
	particularPostController,
} from "../controller/PostController.js";

const router = express.Router();

// -------------------- All Posts routes --------------------
router.get("/", allPostsController.get);
router.delete("/", allPostsController.delete);

// -------------------- Create Post route --------------------
router.post("/", createPostController.post);

// -------------------- Particular Post routes --------------------
router.get("/:id", particularPostController.get);
router.patch("/:id", particularPostController.patch);
router.delete("/:id", particularPostController.delete);

export default router;
