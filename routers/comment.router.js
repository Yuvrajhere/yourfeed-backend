const express = require("express");
const router = express.Router();
const {
  addNewComment,
  deleteCommentById,
  selectCommentsByPostId,
  selectRecent2CommentsByPostId,
  editComment
} = require("../controllers/comment.controller");
const { checkToken } = require("../controllers/auth.controller");

router.post("/", checkToken, addNewComment);
router.get("/preview/:id/", checkToken, selectRecent2CommentsByPostId);
router.get("/:id/", checkToken, selectCommentsByPostId);
router.delete("/:id", checkToken, deleteCommentById);
router.put("/", checkToken, editComment);
module.exports = router;
