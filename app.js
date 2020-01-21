const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 5000;
require("dotenv").config();

const Post = require("./routes/post");

// Middleware
app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(console.log("Successfully connected to database"))
  .catch(err => {
    console.log(err);
  });

app.get("/api/post/:postId", (req, res) => {
  Post.findOnePost(req, res);
});

app.get("/api/posts", (req, res) => {
  Post.findPosts(req, res);
});

app.post("/api/post", (req, res) => {
  Post.createPost(req, res);
});

app.put("/api/post/update/:postId", (req, res) => {
  Post.findPostAndUpdate(req, res);
});

app.delete("/api/post/delete/:postId", (req, res) => {
  Post.findPostAndDelete(req, res);
});

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
