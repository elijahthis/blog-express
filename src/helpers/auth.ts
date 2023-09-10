import bcrypt from "bcrypt";
import { IUser } from "../types/interfaces.js";
import jwt from "jsonwebtoken";

export const hashPassword = async (password) => {
	try {
		const salt = await bcrypt.genSalt(8);
		return await bcrypt.hash(password, salt);
	} catch (error) {
		console.error(error);
		return;
	}
};

export const validatePassword = async (
	password: string,
	hashedPassword: string
) => {
	try {
		return await bcrypt.compare(password, hashedPassword);
	} catch (error) {
		console.error(error);
	}
	// return false;
};

export const generateSignedToken = async (userObj: IUser) => {
	return await jwt.sign(
		{
			ID: userObj.ID,
			username: userObj.username,
			email: userObj.email,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: "1h",
		}
	);
};

export const removePassword = (userObj: IUser) => {
	const { password, ...rest } = userObj;
	return rest;
};
