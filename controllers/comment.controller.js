const {
  insertComment,
  deleteComment,
  selectComments,
  selectRecent2Comments,
  updateComment,
} = require("../services/comment.service");

const addNewComment = (req, res) => {
  const body = req.body;
  insertComment(body, (err, results) => {
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

const selectRecent2CommentsByPostId = (req, res) => {
  const id = req.params.id;
  selectRecent2Comments(id, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Database connection error",
      });
    }
    if (!results) {
      return res.json({
        success: false,
        message: "Comment Not found",
      });
    }
    return res.status(200).json({
      success: true,
      results: results,
    });
  });
};

const selectCommentsByPostId = (req, res) => {
  const id = req.params.id;
  selectComments(id, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Database connection error",
      });
    }
    if (!results) {
      return res.json({
        success: false,
        message: "Comment Not found",
      });
    }
    return res.status(200).json({
      success: true,
      results: results,
    });
  });
};

const deleteCommentById = (req, res) => {
  const id = req.params.id;
  deleteComment(id, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!results) {
      return res.json({
        success: false,
        message: "Comment not found",
      });
    }
    return res.json({
      success: true,
      message: "Comment deleted successfully",
    });
  });
};

const editComment = (req, res) => {
  const comment = req.body;

  // console.log("comment edit", req.body);

  // return res.json({
  //   success: true,
  //   message: "Comment updated successfully",
  // });

  updateComment(comment, (err, results) => {
    if (err) {
      console.log("err", err);
      return res.json({
        success: false,
        message: "Unable to update Comment",
      });
    }
    return res.json({
      success: true,
      message: "Comment updated successfully",
    });
  });
};

module.exports = {
  addNewComment,
  deleteCommentById,
  selectCommentsByPostId,
  selectRecent2CommentsByPostId,
  editComment,
};
