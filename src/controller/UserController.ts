import { removePassword } from "../helpers/auth.js";
import UserModel from "../models/UserModel.js";

export const particularUserController = {
	get: async (req, res) => {
		const selectedUser = await UserModel.findOne({ ID: req.params.id });

		if (!selectedUser) {
			return res.status(404).json({ message: "User not found" });
		}

		res.status(200).json(removePassword(selectedUser.toJSON()));
	},
	patch: async (req, res) => {
		let updatedUserData = removePassword(req.body);

		try {
			const updatedUser = await UserModel.findOneAndUpdate(
				{ ID: req.params.id },
				updatedUserData,
				{ new: true }
			);
			if (!updatedUser) {
				return res.status(404).json({ message: "User not found" });
			}

			return res.status(200).json(removePassword(updatedUser.toJSON()));
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: "Server Error" });
		}
	},
	delete: async (req, res) => {
		try {
			const deletedUser = await UserModel.findOneAndDelete({
				ID: req.params.id,
			});
			if (!deletedUser) {
				return res.status(404).json({ message: "User not found" });
			}

			return res.status(200).json({
				success: true,
				message: "User deleted",
				user: removePassword(deletedUser.toJSON()),
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: "Server Error" });
		}
	},
};

export const allUsersController = {
	get: async (req, res) => {
		const userList = await UserModel.find({});

		return res
			.status(200)
			.json(userList.map((user) => removePassword(user.toJSON())));
	},
	delete: async (req, res) => {
		try {
			const deletedUsers = await UserModel.deleteMany({});
			return res.status(200).json({
				success: true,
				message: "All Users deleted",
				deletedUsers,
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: "Server Error" });
		}
	},
};

export const currentUserController = {
	get: async (req, res) => {
		const currentUser = await UserModel.findOne({ ID: res.locals.user?.ID });
		if (!currentUser) {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(200).json(removePassword(currentUser.toJSON()));
	},
	patch: async (req, res) => {
		let updatedUserData = removePassword(req.body);

		try {
			const updatedUser = await UserModel.findOneAndUpdate(
				{ ID: res.locals.user?.ID },
				updatedUserData,
				{ new: true }
			);
			if (!updatedUser) {
				return res.status(404).json({ message: "User not found" });
			}

			return res.status(200).json(removePassword(updatedUser.toJSON()));
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: "Server Error" });
		}
	},
	delete: async (req, res) => {
		try {
			const deletedUser = await UserModel.findOneAndDelete({
				ID: res.locals.user?.ID,
			});

			if (!deletedUser) {
				return res.status(404).json({ message: "User not found" });
			}

			return res.status(200).json({
				success: true,
				message: "User deleted",
				user: removePassword(deletedUser.toJSON()),
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: "Server Error" });
		}
	},
};
