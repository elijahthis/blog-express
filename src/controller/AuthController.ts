import express from "express";
import UserModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import { randomBytes } from "crypto";
import {
	hashPassword,
	validatePassword,
} from "../middleware/auth.middleware.js";

export const loginController = {
	post: async (req: express.Request, res: express.Response) => {
		let { username, password } = req.body;
		let existingUser = null;

		try {
			existingUser = await UserModel.findOne({ username });
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Server Error" });
			return;
		}
		if (!existingUser) {
			res.status(401).json({ message: "User does not exist" });
			return;
		}
		const isCorrectPassword = await validatePassword(
			password,
			existingUser.password
		);
		if (!isCorrectPassword) {
			res.status(401).json({ message: "Invalid Credentials" });
			return;
		}

		let token;

		// creating a jwt token
		try {
			token = jwt.sign(
				{
					userId: existingUser._id,
					username: existingUser.username,
					email: existingUser.email,
				},
				process.env.JWT_SECRET,
				{
					expiresIn: "1h",
				}
			);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Server Error" });
			return;
		}

		res.status(200).json({ success: true, token, data: existingUser });
		return;
	},
};

export const signupController = {
	post: async (req, res) => {
		let { first_name, last_name, email, username, password } = req.body;
		let existingUser = null;

		try {
			existingUser = await UserModel.findOne({ username });
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Server Error" });
			return;
		}
		if (existingUser) {
			res.status(401).json({ message: "User already exists" });
			return;
		}

		console.log(await hashPassword(password));
		//creating a new user
		const newUser = new UserModel({
			first_name,
			last_name,
			email,
			username,
			password: await hashPassword(password),
			ID: randomBytes(32).toString("hex"),
			created_at: new Date(),
		});

		try {
			await newUser.save();
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Server Error" });
			return;
		}

		// creating a jwt token
		let token;
		try {
			token = jwt.sign(
				{
					userId: newUser._id,
					username: newUser.username,
					email: newUser.email,
				},
				process.env.JWT_SECRET,
				{
					expiresIn: "1h",
				}
			);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Server Error" });
			return;
		}

		res.status(200).json({ success: true, token, data: newUser });
		return;
	},
};

export const otpController = {
	post: (req, res) => {
		res.status(200).json({ message: "OTP Successful" });
	},
};
