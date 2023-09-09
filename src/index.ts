import { config } from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";

import connectDB from "./config/db.js";
import AuthRoutes from "./routes/Auth.js";
import jwt from "jsonwebtoken";
import { checkJwt } from "./middleware/auth.middleware.js";

config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// -------------------- Unauthenticated Routes --------------------
app.use("/auth", AuthRoutes);

app.get("/", (req, res) => {
	res.status(200).json({ message: "Hello World" });
});

// -------------------- Authenticated routes --------------------
app.use(checkJwt);

app.get("/authed", (req, res) => {
	res.status(200).json({ message: "Authed" });
});

// -------------------- Connect to database, then start server --------------------
connectDB()
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log(process.env.PORT);
		});
	})
	.catch((err) => {
		console.error(err);
	});
