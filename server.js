const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello there");
});

const userRouter = require("./routers/user.router");
const authRouter = require("./routers/auth.router");
const postRouter = require("./routers/post.router");
const likeRouter = require("./routers/like.router");
const reportRouter = require("./routers/report.router");
const commentRouter = require("./routers/comment.router");
const categoryRouter = require("./routers/category.router");

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/likes", likeRouter);
app.use("/api/reports", reportRouter);
app.use("/api/comments", commentRouter);
app.use("/api/categories", categoryRouter);

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
