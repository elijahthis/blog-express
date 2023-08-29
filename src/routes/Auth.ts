import express from "express";
import {
	loginController,
	signupController,
	otpController,
} from "../controller/AuthController.js";

const router = express.Router();

router.post("/login", loginController.post);
router.post("/signup", signupController.post);
router.post("/otp", otpController.post);

export default router;
