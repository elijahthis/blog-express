import { Schema, model } from "mongoose";
import { IPost, IUser } from "../types/interfaces.js";

const PostSchema = new Schema<IPost>({
	ID: { type: String, required: true },
	title: { type: String, required: true },
	body: { type: String, required: true },
	image: String,
	video: String,
	created_at: { type: Date, required: true },
	creator: { type: String, required: true },
	likes: { type: [String], required: true },
	comments: {
		type: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
		required: true,
	},
});

export default model<IPost>("Post", PostSchema);
