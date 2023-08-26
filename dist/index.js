import { config } from "dotenv";
import express from "express";
config();
const app = express();
app.listen(3000, () => {
	console.log(process.env.PORT);
});
//# sourceMappingURL=index.js.map
