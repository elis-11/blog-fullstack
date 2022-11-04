import mongoose from "mongoose";
import config from "./config.js"

mongoose.connect(config.MONGO_URI)
.then(() => console.log("DB connected!"))
.catch((err) => console.log("[ERROR] DB Connection failed", err.message))