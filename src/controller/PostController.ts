import { randomBytes } from "crypto";
import PostModel from "../models/PostModel.js";
import { IPost } from "../types/interfaces.js";

export const allPostsController = {
	get: async (req, res) => {
		const postList = PostModel.find({});

		return res.status(200).json(postList);
	},
	delete: async (req, res) => {
		try {
			const deletedPosts = PostModel.deleteMany({});
			return res
				.status(200)
				.json({ success: true, message: "All Users deleted", deletedPosts });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: "Server Error" });
		}
	},
};
export const particularPostController = {
	get: async (req, res) => {
		const post = PostModel.findOne({ ID: req.params.ID });

		if (!post) return res.status(404).json({ message: "Post not found" });

		return res.status(200).json(post);
	},
	patch: async (req, res) => {
		const { title, body, image, video } = req.body;

		try {
			const updatedPost = PostModel.findOneAndUpdate({
				ID: req.params.ID,
			});

			if (!updatedPost) {
				return res.status(404).json({ message: "Post not found" });
			}

			return res.status(200).json({ success: true, updatedPost });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: "Server Error" });
		}
	},
	delete: async (req, res) => {
		try {
			const deletedPost = PostModel.findOneAndDelete({ ID: req.params.ID });
			if (!deletedPost) {
				return res.status(404).json({ message: "Post not found" });
			}
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: "Server Error" });
		}
	},
};
export const createPostController = {
	post: async (req, res) => {
		const { title, body, image, video } = req.body;

		const newPost = new PostModel<IPost>({
			ID: randomBytes(32).toString("hex"),
			title,
			body,
			image,
			video,
			created_at: new Date(),
			modified_at: new Date(),
			creator: res.locals.user?.ID,
			likes: [],
			comments: [],
		});

		try {
			const savedPost = await newPost.save();
			return res.status(201).json({ success: true, post: savedPost.toJSON() });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: "Server Error" });
		}
	},
};
