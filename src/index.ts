import { config } from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";

import connectDB from "./config/db.js";
import AuthRoutes from "./routes/Auth.js";

config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use("/auth", AuthRoutes);

connectDB()
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log(process.env.PORT);
		});
	})
	.catch((err) => {
		console.error(err);
	});
