import bcrypt from "bcrypt";

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
