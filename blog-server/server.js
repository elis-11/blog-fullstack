import config from "./config.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import "./connect-db.js";
import userRouter from "./routes/user.router.js";
import postRouter from "./routes/post.router.js";
import commentsRouter from "./routes/comment.router.js";
import { errorHandler404, errorHandlerGeneric } from "./lib/error-handler.js";

const app = express();

app.use(morgan("dev")); // log all requests to API
app.use(cors()); // this is enough setup for token exchange
app.use(express.json({ limit: "300KB" })); // JSON Parser => req.body

app.get("/", (req, res) => {
  // res.send("Hello from API!")
  res.send(`
  <h2>Welcome!</h2>
<div>Our routes:</div>
<div>Home: <a href="/">/</a></div>
<div>User: <a href="/user">/user</a></div>
<div>Posts: <a href="/posts">/posts</a></div>
<div>Comments: <a href="/comments">/comments</a></div>
`);
});

// load ROUTERS
app.use("/user", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentsRouter);

/// 404 error handler
app.use(errorHandler404);

// GENERIC error handler
// ALL errors in our code, are automatically
// forwarded from express to here
app.use(errorHandlerGeneric);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
