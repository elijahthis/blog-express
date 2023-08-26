import { config } from "dotenv";
import express from "express";

config();

const app = express();

app.listen(process.env.PORT, () => {
	console.log(process.env.PORT);
});
