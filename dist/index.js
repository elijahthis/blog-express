import { config } from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
config();
const app = express();
connectDB()
    .then(() => {
    app.listen(process.env.PORT, () => {
        console.log(process.env.PORT);
    });
})
    .catch((err) => {
    console.error(err);
});
//# sourceMappingURL=index.js.map