const Post = require("../models/post");

// create post
const createPost = (req, res) => {
  const post = new Post({
    title: req.body.title,
    author: req.body.author,
    image: req.body.image,
    body: req.body.body
  });
  post
    .save()
    .then(result => {
      res.status("201").json({
        message: "successfully saved post",
        createdPost: post
      });
      console.log(result);
    })
    .catch(err => {
      res.status("400").json({
        message: err.message
      });
      console.log(err);
    });
};

// find all post
const findPosts = (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) {
      console.log(err);
    }
    res.json(posts);
  });
};

// find a post
const findOnePost = (req, res) => {
  id = req.params.postId;
  Post.findById(id)
    .exec()
    .then(result => {
      if (result) {
        console.log(result);
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "No valid Entry found" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

//modify a post
const findPostAndUpdate = (req, res) => {
  id = req.params.postId;
  Post.findByIdAndUpdate(
    id,
    {
      title: req.body.title,
      author: req.body.author,
      image: req.body.image,
      body: req.body.body
    },
    { runValidators: true, useFindAndModify: false }
  )
    .then(result => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "No valid Entry found" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

// delete a post
const findPostAndDelete = (req, res) => {
  id = req.params.postId;
  Post.findByIdAndDelete(id)
    .then(result => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "No valid Entry found" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

module.exports = {
  createPost,
  findPosts,
  findOnePost,
  findPostAndUpdate,
  findPostAndDelete
};
