import express from "express";

export const loginController = {
	post: (req: express.Request, res: express.Response) => {
		res.status(200).json({ message: "Login Successful" });
	},
};

export const signupController = {
	post: (req, res) => {
		res.status(200).json({ message: "Signup Successful" });
	},
};

export const otpController = {
	post: (req, res) => {
		res.status(200).json({ message: "OTP Successful" });
	},
};
