import { Schema, model } from "mongoose";
import { IComment } from "../types/interfaces.js";

const Comment = new Schema<IComment>({
	user: { type: String, required: true },
	body: { type: String, required: true },
	created_at: { type: Date, required: true },
	comments: { type: [String], required: true },
	parent_id: { type: String, required: true },
});

export default model<IComment>("Comment", Comment);
