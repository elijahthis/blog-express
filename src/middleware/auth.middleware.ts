import jwt from "jsonwebtoken";

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
		res.locals.user = decodedToken;
		next();
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Invalid Token" });
		return;
	}
};
