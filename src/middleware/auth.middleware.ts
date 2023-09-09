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

export const checkJwt = async (req, res, next) => {
	const token = req.headers.authorization?.split(" ")[1];

	// Authorization: 'Bearer TOKEN'
	if (!token) {
		res.status(401).json({ message: "No token provided" });
		return;
	}

	// decode the token
	try {
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
		next();
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Malformed JWT" });
		return;
	}
};
