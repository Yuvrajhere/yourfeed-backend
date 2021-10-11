const express = require("express");
const router = express.Router();
const {
  addNewPost,
  updatePostImageByPostId,
  getAllPosts,
  getAllReportedPosts,
  deletePostByPostId,
  getAllPostsByUserId
} = require("../controllers/post.controller");
const { checkToken, isAdmin } = require("../controllers/auth.controller");
const { upload } = require("../config/multer-config");

router.post("/", checkToken, addNewPost);
router.patch("/", checkToken, upload.single("image"), updatePostImageByPostId);
router.get("/", checkToken, getAllPosts);
router.get("/reported", checkToken, isAdmin, getAllReportedPosts);
router.get("/:userId", checkToken, getAllPostsByUserId);
router.delete("/:id", checkToken, isAdmin, deletePostByPostId );

module.exports = router;
