import { Schema, model } from "mongoose";
import { IUser } from "../types/interfaces.js";

const UserSchema = new Schema<IUser>({
	ID: { type: String, required: true },
	first_name: {
		type: String,
		required: true,
	},
	last_name: { type: String, required: true },
	email: { type: String, required: true },
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true, unique: true },
	created_at: { type: Date, required: true },
});

export default model<IUser>("User", UserSchema);
