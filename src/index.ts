import { config } from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";

import connectDB from "./config/db.js";
import AuthRoutes from "./routes/Auth.js";
// import { checkJwt } from "./middleware/auth.middleware.js";

config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use("/auth", AuthRoutes);

app.get("/lala", (req, res) => {
	res.status(200).json({ reqObject: "" });
});

//Authenticated routes
// app.use(checkJwt);
app.get("/", (req, res) => {
	res.status(200).json({ reqObject: "" });
});

connectDB()
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log(process.env.PORT);
		});
	})
	.catch((err) => {
		console.error(err);
	});
