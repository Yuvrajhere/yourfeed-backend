const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const {
  insertPost,
  selectPosts,
  selectPostsById,
  selectReportedPosts,
  updatePostImageById,
  deletePostById,
} = require("../services/post.service");
const fs = require("fs");

const deleteFile = (path) => {
  fs.unlink(path, (err) => {
    if (err) {
      throw err;
    } else {
      console.log("Successfully deleted the file.");
    }
  });
};

const addNewPost = (req, res) => {
  const body = req.body;
  insertPost(body, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Database connection error",
      });
    }
    return res.status(200).json({
      success: true,
      results: results,
    });
  });
};

const getAllPosts = (req, res) => {
  selectPosts((err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Database connection error",
      });
    }
    console.log("posts for home requested");
    return res.json({
      success: true,
      data: results,
    });
  });
};

const getAllReportedPosts = (req, res) => {
  selectReportedPosts((err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Database connection error",
      });
    }
    return res.json({
      success: true,
      data: results,
    });
  });
};

const getAllPostsByUserId = (req, res) => {
  const { userId } = req.params;
  console.log("userId", userId);

  selectPostsById(userId, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Database connection error",
      });
    }
    return res.json({
      success: true,
      data: results,
    });
  });
};

const updatePostImageByPostId = (req, res) => {
  const { id } = req.body;

  if (req.file) {
    console.log("image reached!");

    const { path } = req.file;

    const image = fs.readFileSync(path);
    updatePostImageById(id, image, (err, results) => {
      if (err) {
        console.log("err", err);
        deleteFile(path);
        return res.json({
          success: false,
          message: "failed to save post image",
        });
      }
      deleteFile(path);
      return res.json({
        success: true,
        message: "Post image saved successfully",
      });
    });
  } else {
    console.log("image not reached!");
    return res.json({
      success: false,
      message: "Improper Image passed, only jpeg allowed",
    });
  }
};

const deletePostByPostId = (req, res) => {
  const id = req.params.id;
  deletePostById(id, (err, results) => {
    if (err) {
      console.log(err);
      return res.json({
        success: false,
        message: err,
      });
    }
    if (!results) {
      return res.json({
        success: false,
        message: "Post not found",
      });
    }
    return res.json({
      success: true,
      message: "Post deleted successfully",
    });
  });
};

module.exports = {
  addNewPost,
  updatePostImageByPostId,
  getAllPosts,
  getAllReportedPosts,
  deletePostByPostId,
  getAllPostsByUserId,
};
