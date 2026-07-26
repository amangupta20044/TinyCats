import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import { connectDb } from "./config/db.js";

connectDb();

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server is running on ${port}`);
});